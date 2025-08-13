import { NextResponse } from 'next/server';
import { db } from '@/db';
import { activityParticipants } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/activity-participants:
 *   get:
 *     description: Returns all activity participants
 *     tags:
 *       - Activity Participants
 *     responses:
 *       200:
 *         description: A list of activity participants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ActivityParticipant'
 */
export async function GET() {
  const data = await db.select().from(activityParticipants);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/activity-participants:
 *   post:
 *     description: Creates a new activity participant
 *     tags:
 *       - Activity Participants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewActivityParticipant'
 *     responses:
 *       201:
 *         description: The created activity participant.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActivityParticipant'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newActivityParticipant = await db
    .insert(activityParticipants)
    .values(body)
    .returning();
  return NextResponse.json(newActivityParticipant[0], { status: 201 });
}
