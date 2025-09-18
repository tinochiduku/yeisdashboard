import { NextResponse } from 'next/server';
import { db } from '@/db';
import { activities } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/activities/{id}:
 *   get:
 *     description: Returns a single activity by ID
 *     tags:
 *       - Activities
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Activity not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db.select().from(activities).where(eq(activities.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Activity not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/activities/{id}:
 *   put:
 *     description: Updates an activity
 *     tags:
 *       - Activities
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
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       200:
 *         description: The updated activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Activity not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedActivity = await db
    .update(activities)
    .set(body)
    .where(eq(activities.id, id))
    .returning();
  if (updatedActivity.length === 0) {
    return NextResponse.json(
      { message: 'Activity not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedActivity[0]);
}

/**
 * @swagger
 * /api/activities/{id}:
 *   delete:
 *     description: Deletes an activity
 *     tags:
 *       - Activities
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Activity deleted successfully.
 *       404:
 *         description: Activity not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedActivity = await db
    .delete(activities)
    .where(eq(activities.id, id))
    .returning();
  if (deletedActivity.length === 0) {
    return NextResponse.json(
      { message: 'Activity not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
