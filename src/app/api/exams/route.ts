import { NextResponse } from 'next/server';
import { db } from '@/db';
import { exams } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/exams:
 *   get:
 *     description: Returns all exams
 *     tags:
 *       - Exams
 *     responses:
 *       200:
 *         description: A list of exams.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exam'
 */
export async function GET() {
  const data = await db.select().from(exams);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/exams:
 *   post:
 *     description: Creates a new exam
 *     tags:
 *       - Exams
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewExam'
 *     responses:
 *       201:
 *         description: The created exam.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newExam = await db.insert(exams).values(body).returning();
  return NextResponse.json(newExam[0], { status: 201 });
}
