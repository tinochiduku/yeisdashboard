import { NextResponse } from 'next/server';
import { db } from '@/db';
import { terms } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/terms:
 *   get:
 *     description: Returns all terms
 *     tags:
 *       - Terms
 *     responses:
 *       200:
 *         description: A list of terms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Term'
 */
export async function GET() {
  const data = await db.select().from(terms);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/terms:
 *   post:
 *     description: Creates a new term
 *     tags:
 *       - Terms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTerm'
 *     responses:
 *       201:
 *         description: The created term.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Term'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newTerm = await db.insert(terms).values(body).returning();
  return NextResponse.json(newTerm[0], { status: 201 });
}
