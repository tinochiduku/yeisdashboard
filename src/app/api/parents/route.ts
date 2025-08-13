import { NextResponse } from 'next/server';
import { db } from '@/db';
import { parents } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/parents:
 *   get:
 *     description: Returns all parents
 *     tags:
 *       - Parents
 *     responses:
 *       200:
 *         description: A list of parents.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Parent'
 */
export async function GET() {
  const data = await db.select().from(parents);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/parents:
 *   post:
 *     description: Creates a new parent
 *     tags:
 *       - Parents
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewParent'
 *     responses:
 *       201:
 *         description: The created parent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parent'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newParent = await db.insert(parents).values(body).returning();
  return NextResponse.json(newParent[0], { status: 201 });
}
