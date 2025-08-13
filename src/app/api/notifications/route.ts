import { NextResponse } from 'next/server';
import { db } from '@/db';
import { notifications } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     description: Returns all notifications
 *     tags:
 *       - Notifications
 *     responses:
 *       200:
 *         description: A list of notifications.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 */
export async function GET() {
  const data = await db.select().from(notifications);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     description: Creates a new notification
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewNotification'
 *     responses:
 *       201:
 *         description: The created notification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newNotification = await db
    .insert(notifications)
    .values(body)
    .returning();
  return NextResponse.json(newNotification[0], { status: 201 });
}
