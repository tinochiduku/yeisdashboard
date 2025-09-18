import { NextResponse } from 'next/server';
import { db } from '@/db';
import { notifications } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     description: Returns a single notification by ID
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The notification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notification not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(notifications)
    .where(eq(notifications.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Notification not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/notifications/{id}:
 *   put:
 *     description: Updates a notification
 *     tags:
 *       - Notifications
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
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: The updated notification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notification not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedNotification = await db
    .update(notifications)
    .set(body)
    .where(eq(notifications.id, id))
    .returning();
  if (updatedNotification.length === 0) {
    return NextResponse.json(
      { message: 'Notification not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedNotification[0]);
}

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     description: Deletes a notification
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Notification deleted successfully.
 *       404:
 *         description: Notification not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedNotification = await db
    .delete(notifications)
    .where(eq(notifications.id, id))
    .returning();
  if (deletedNotification.length === 0) {
    return NextResponse.json(
      { message: 'Notification not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
