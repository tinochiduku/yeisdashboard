import { NextResponse } from 'next/server';
import { db } from '@/db';
import { attendance } from '@/db/schema';
import { eq } from 'drizzle-orm';

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
  const data = await db.select().from(attendance);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/attendances:
 *   post:
 *     description: Creates a new attendance record
 *     tags:
 *       - Attendances
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewAttendance'
 *     responses:
 *       201:
 *         description: The created attendance record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newAttendance = await db.insert(attendance).values(body).returning();
  return NextResponse.json(newAttendance[0], { status: 201 });
}
