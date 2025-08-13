import { NextResponse } from 'next/server';
import { db } from '@/db';
import { grades } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/grades:
 *   get:
 *     description: Returns all grades
 *     tags:
 *       - Grades
 *     responses:
 *       200:
 *         description: A list of grades.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 */
export async function GET() {
  const data = await db.select().from(grades);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/grades:
 *   post:
 *     description: Creates a new grade
 *     tags:
 *       - Grades
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewGrade'
 *     responses:
 *       201:
 *         description: The created grade.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newGrade = await db.insert(grades).values(body).returning();
  return NextResponse.json(newGrade[0], { status: 201 });
}
