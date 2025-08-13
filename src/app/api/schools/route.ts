import { NextResponse } from 'next/server';
import { db } from '@/db';
import { schools } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/schools:
 *   get:
 *     description: Returns all schools
 *     tags:
 *       - Schools
 *     responses:
 *       200:
 *         description: A list of schools.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/School'
 */
export async function GET() {
  const data = await db.select().from(schools);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/schools:
 *   post:
 *     description: Creates a new school
 *     tags:
 *       - Schools
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewSchool'
 *     responses:
 *       201:
 *         description: The created school.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newSchool = await db.insert(schools).values(body).returning();
  return NextResponse.json(newSchool[0], { status: 201 });
}
