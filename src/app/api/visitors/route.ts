import { NextResponse } from 'next/server';
import { db } from '@/db';
import { visitors } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/visitors:
 *   get:
 *     description: Returns all visitors
 *     tags:
 *       - Visitors
 *     responses:
 *       200:
 *         description: A list of visitors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Visitor'
 */
export async function GET() {
  const data = await db.select().from(visitors);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/visitors:
 *   post:
 *     description: Creates a new visitor
 *     tags:
 *       - Visitors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewVisitor'
 *     responses:
 *       201:
 *         description: The created visitor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visitor'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newVisitor = await db.insert(visitors).values(body).returning();
  return NextResponse.json(newVisitor[0], { status: 201 });
}
