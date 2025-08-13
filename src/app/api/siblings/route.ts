import { NextResponse } from 'next/server';
import { db } from '@/db';
import { siblings } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/siblings:
 *   get:
 *     description: Returns all sibling relationships
 *     tags:
 *       - Siblings
 *     responses:
 *       200:
 *         description: A list of sibling relationships.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sibling'
 */
export async function GET() {
  const data = await db.select().from(siblings);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/siblings:
 *   post:
 *     description: Creates a new sibling relationship
 *     tags:
 *       - Siblings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewSibling'
 *     responses:
 *       201:
 *         description: The created sibling relationship.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sibling'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newSibling = await db.insert(siblings).values(body).returning();
  return NextResponse.json(newSibling[0], { status: 201 });
}
