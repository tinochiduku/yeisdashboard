import { NextResponse } from 'next/server';
import { db } from '@/db';
import { communications } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/communications:
 *   get:
 *     description: Returns all communications
 *     tags:
 *       - Communications
 *     responses:
 *       200:
 *         description: A list of communications.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Communication'
 */
export async function GET() {
  const data = await db.select().from(communications);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/communications:
 *   post:
 *     description: Creates a new communication
 *     tags:
 *       - Communications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCommunication'
 *     responses:
 *       201:
 *         description: The created communication.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Communication'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newCommunication = await db
    .insert(communications)
    .values(body)
    .returning();
  return NextResponse.json(newCommunication[0], { status: 201 });
}
