import { NextResponse } from 'next/server';
import { db } from '@/db';
import { events } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/events:
 *   get:
 *     description: Returns all events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: A list of events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
export async function GET() {
  const data = await db.select().from(events);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/events:
 *   post:
 *     description: Creates a new event
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewEvent'
 *     responses:
 *       201:
 *         description: The created event.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newEvent = await db.insert(events).values(body).returning();
  return NextResponse.json(newEvent[0], { status: 201 });
}
