import { NextResponse } from 'next/server';
import { db } from '@/db';
import { competitions } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/competitions:
 *   get:
 *     description: Returns all competitions
 *     tags:
 *       - Competitions
 *     responses:
 *       200:
 *         description: A list of competitions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Competition'
 */
export async function GET() {
  const data = await db.select().from(competitions);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/competitions:
 *   post:
 *     description: Creates a new competition
 *     tags:
 *       - Competitions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCompetition'
 *     responses:
 *       201:
 *         description: The created competition.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Competition'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newCompetition = await db.insert(competitions).values(body).returning();
  return NextResponse.json(newCompetition[0], { status: 201 });
}
