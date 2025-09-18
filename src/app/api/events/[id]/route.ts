import { NextResponse } from 'next/server';
import { db } from '@/db';
import { events } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     description: Returns a single event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The event.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db.select().from(events).where(eq(events.id, id));
  if (data.length === 0) {
    return NextResponse.json({ message: 'Event not found' }, { status: 404 });
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     description: Updates an event
 *     tags:
 *       - Events
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
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: The updated event.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedEvent = await db
    .update(events)
    .set(body)
    .where(eq(events.id, id))
    .returning();
  if (updatedEvent.length === 0) {
    return NextResponse.json({ message: 'Event not found' }, { status: 404 });
  }
  return NextResponse.json(updatedEvent[0]);
}

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     description: Deletes an event
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Event deleted successfully.
 *       404:
 *         description: Event not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedEvent = await db
    .delete(events)
    .where(eq(events.id, id))
    .returning();
  if (deletedEvent.length === 0) {
    return NextResponse.json({ message: 'Event not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
