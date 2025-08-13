import { NextResponse } from 'next/server';
import { db } from '@/db';
import { activityParticipants } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/activity-participants/{id}:
 *   get:
 *     description: Returns a single activity participant by ID
 *     tags:
 *       - Activity Participants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The activity participant.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActivityParticipant'
 *       404:
 *         description: Activity participant not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(activityParticipants)
    .where(eq(activityParticipants.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Activity participant not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/activity-participants/{id}:
 *   put:
 *     description: Updates an activity participant
 *     tags:
 *       - Activity Participants
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
 *             $ref: '#/components/schemas/ActivityParticipant'
 *     responses:
 *       200:
 *         description: The updated activity participant.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActivityParticipant'
 *       404:
 *         description: Activity participant not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedActivityParticipant = await db
    .update(activityParticipants)
    .set(body)
    .where(eq(activityParticipants.id, id))
    .returning();
  if (updatedActivityParticipant.length === 0) {
    return NextResponse.json(
      { message: 'Activity participant not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedActivityParticipant[0]);
}

/**
 * @swagger
 * /api/activity-participants/{id}:
 *   delete:
 *     description: Deletes an activity participant
 *     tags:
 *       - Activity Participants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Activity participant deleted successfully.
 *       404:
 *         description: Activity participant not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedActivityParticipant = await db
    .delete(activityParticipants)
    .where(eq(activityParticipants.id, id))
    .returning();
  if (deletedActivityParticipant.length === 0) {
    return NextResponse.json(
      { message: 'Activity participant not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
