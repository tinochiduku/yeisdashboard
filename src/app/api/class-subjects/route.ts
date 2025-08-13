import { NextResponse } from 'next/server';
import { db } from '@/db';
import { classSubjects } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/class-subjects:
 *   get:
 *     description: Returns all class-subject assignments
 *     tags:
 *       - Class Subjects
 *     responses:
 *       200:
 *         description: A list of class-subject assignments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClassSubject'
 */
export async function GET() {
  const data = await db.select().from(classSubjects);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/class-subjects:
 *   post:
 *     description: Creates a new class-subject assignment
 *     tags:
 *       - Class Subjects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewClassSubject'
 *     responses:
 *       201:
 *         description: The created class-subject assignment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassSubject'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newClassSubject = await db
    .insert(classSubjects)
    .values(body)
    .returning();
  return NextResponse.json(newClassSubject[0], { status: 201 });
}
