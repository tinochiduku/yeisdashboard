import { NextResponse } from 'next/server';
import { db } from '@/db';
import { students } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/students:
 *   get:
 *     description: Returns all students
 *     tags:
 *       - Students
 *     responses:
 *       200:
 *         description: A list of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
export async function GET() {
  const data = await db.select().from(students);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/students:
 *   post:
 *     description: Creates a new student
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewStudent'
 *     responses:
 *       201:
 *         description: The created student.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newStudent = await db.insert(students).values(body).returning();
  return NextResponse.json(newStudent[0], { status: 201 });
}
