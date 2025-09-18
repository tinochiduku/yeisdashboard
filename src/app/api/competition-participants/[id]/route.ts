import { NextResponse } from 'next/server';
import { db } from '@/db';
import { competitionParticipants } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/competition-participants/{id}:
 *   get:
 *     description: Returns a single competition participant by ID
 *     tags:
 *       - Competition Participants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The competition participant.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompetitionParticipant'
 *       404:
 *         description: Competition participant not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(competitionParticipants)
    .where(eq(competitionParticipants.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Competition participant not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/competition-participants/{id}:
 *   put:
 *     description: Updates a competition participant
 *     tags:
 *       - Competition Participants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompetitionParticipant'
 *     responses:
 *       200:
 *         description: The updated competition participant.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompetitionParticipant'
 *       404:
 *         description: Competition participant not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedCompetitionParticipant = await db
    .update(competitionParticipants)
    .set(body)
    .where(eq(competitionParticipants.id, id))
    .returning();
  if (updatedCompetitionParticipant.length === 0) {
    return NextResponse.json(
      { message: 'Competition participant not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedCompetitionParticipant[0]);
}

/**
 * @swagger
 * /api/competition-participants/{id}:
 *   delete:
 *     description: Deletes a competition participant
 *     tags:
 *       - Competition Participants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Competition participant deleted successfully.
 *       404:
 *         description: Competition participant not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedCompetitionParticipant = await db
    .delete(competitionParticipants)
    .where(eq(competitionParticipants.id, id))
    .returning();
  if (deletedCompetitionParticipant.length === 0) {
    return NextResponse.json(
      { message: 'Competition participant not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
