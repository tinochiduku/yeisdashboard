import { NextResponse } from 'next/server';
import { db } from '@/db';
import { leaves } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/leaves:
 *   get:
 *     description: Returns all leaves
 *     tags:
 *       - Leaves
 *     responses:
 *       200:
 *         description: A list of leaves.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Leave'
 */
export async function GET() {
  const data = await db.select().from(leaves);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/leaves:
 *   post:
 *     description: Creates a new leave
 *     tags:
 *       - Leaves
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewLeave'
 *     responses:
 *       201:
 *         description: The created leave.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leave'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newLeave = await db.insert(leaves).values(body).returning();
  return NextResponse.json(newLeave[0], { status: 201 });
}
