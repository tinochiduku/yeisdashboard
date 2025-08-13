import { NextResponse } from 'next/server';
import { db } from '@/db';
import { timetable } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/timetables/{id}:
 *   get:
 *     description: Returns a single timetable by ID
 *     tags:
 *       - Timetables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The timetable.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Timetable'
 *       404:
 *         description: Timetable not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db.select().from(timetable).where(eq(timetable.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Timetable not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/timetables/{id}:
 *   put:
 *     description: Updates a timetable
 *     tags:
 *       - Timetables
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
 *             $ref: '#/components/schemas/Timetable'
 *     responses:
 *       200:
 *         description: The updated timetable.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Timetable'
 *       404:
 *         description: Timetable not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedTimetable = await db
    .update(timetable)
    .set(body)
    .where(eq(timetable.id, id))
    .returning();
  if (updatedTimetable.length === 0) {
    return NextResponse.json(
      { message: 'Timetable not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedTimetable[0]);
}

/**
 * @swagger
 * /api/timetables/{id}:
 *   delete:
 *     description: Deletes a timetable
 *     tags:
 *       - Timetables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Timetable deleted successfully.
 *       404:
 *         description: Timetable not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedTimetable = await db
    .delete(timetable)
    .where(eq(timetable.id, id))
    .returning();
  if (deletedTimetable.length === 0) {
    return NextResponse.json(
      { message: 'Timetable not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
