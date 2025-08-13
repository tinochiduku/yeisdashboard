import { NextResponse } from 'next/server';
import { db } from '@/db';
import { competitionParticipants } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/competition-participants:
 *   get:
 *     description: Returns all competition participants
 *     tags:
 *       - Competition Participants
 *     responses:
 *       200:
 *         description: A list of competition participants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CompetitionParticipant'
 */
export async function GET() {
  const data = await db.select().from(competitionParticipants);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/competition-participants:
 *   post:
 *     description: Creates a new competition participant
 *     tags:
 *       - Competition Participants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCompetitionParticipant'
 *     responses:
 *       201:
 *         description: The created competition participant.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompetitionParticipant'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newCompetitionParticipant = await db
    .insert(competitionParticipants)
    .values(body)
    .returning();
  return NextResponse.json(newCompetitionParticipant[0], { status: 201 });
}
