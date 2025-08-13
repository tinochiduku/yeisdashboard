import { NextResponse } from 'next/server';
import { db } from '@/db';
import { examSubjects } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/exam-subjects:
 *   get:
 *     description: Returns all exam subjects
 *     tags:
 *       - Exam Subjects
 *     responses:
 *       200:
 *         description: A list of exam subjects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExamSubject'
 */
export async function GET() {
  const data = await db.select().from(examSubjects);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/exam-subjects:
 *   post:
 *     description: Creates a new exam subject
 *     tags:
 *       - Exam Subjects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewExamSubject'
 *     responses:
 *       201:
 *         description: The created exam subject.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExamSubject'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newExamSubject = await db.insert(examSubjects).values(body).returning();
  return NextResponse.json(newExamSubject[0], { status: 201 });
}
