import { NextResponse } from 'next/server';
import { db } from '@/db';
import { classes } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/classes:
 *   get:
 *     description: Returns all classes
 *     tags:
 *       - Classes
 *     responses:
 *       200:
 *         description: A list of classes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */
export async function GET() {
  const data = await db.select().from(classes);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/classes:
 *   post:
 *     description: Creates a new class
 *     tags:
 *       - Classes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewClass'
 *     responses:
 *       201:
 *         description: The created class.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newClass = await db.insert(classes).values(body).returning();
  return NextResponse.json(newClass[0], { status: 201 });
}
