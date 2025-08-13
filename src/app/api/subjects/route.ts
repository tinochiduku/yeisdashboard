import { NextResponse } from 'next/server';
import { db } from '@/db';
import { subjects } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     description: Returns all subjects
 *     tags:
 *       - Subjects
 *     responses:
 *       200:
 *         description: A list of subjects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 */
export async function GET() {
  const data = await db.select().from(subjects);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     description: Creates a new subject
 *     tags:
 *       - Subjects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewSubject'
 *     responses:
 *       201:
 *         description: The created subject.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newSubject = await db.insert(subjects).values(body).returning();
  return NextResponse.json(newSubject[0], { status: 201 });
}
