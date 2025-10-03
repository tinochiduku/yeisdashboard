import { NextResponse } from 'next/server';
import { db } from '@/db';
import { attendance, classes, schools, students } from '@/db/schema';
import { desc } from 'drizzle-orm';

/**
 * @swagger
 * /api/attendances:
 *   get:
 *     description: Returns all attendance records
 *     tags:
 *       - Attendances
 *     responses:
 *       200:
 *         description: A list of attendance records.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attendance'
 */
export async function GET() {
  
  const _students = await db.select().from(students);
  const _schools = await db.select().from(schools);
  const _classes = await db.select().from(classes)
  const _records = await db.select().from(attendance).orderBy(desc(attendance.date));

  const data = _students.map((student: any) => ({
    ...student,
    name: `${student.firstName} ${student.lastName}`,
    status: _records.filter(({ studentId }) => studentId === student.id),
    schoolName: _schools.filter(({id}) => id === student.schoolId)[0]?.name,
    className: _classes.filter(({id}) => id === student.classId)[0]?.name,
    date: new Date().toDateString()
  }))

  return NextResponse.json(data);
}

