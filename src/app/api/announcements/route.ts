import { NextResponse } from 'next/server';
import { db } from '@/db';
import { announcements } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/announcements:
 *   get:
 *     description: Returns all announcements
 *     tags:
 *       - Announcements
 *     responses:
 *       200:
 *         description: A list of announcements.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Announcement'
 */
export async function GET() {
  const data = await db.select().from(announcements);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/announcements:
 *   post:
 *     description: Creates a new announcement
 *     tags:
 *       - Announcements
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewAnnouncement'
 *     responses:
 *       201:
 *         description: The created announcement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newAnnouncement = await db
    .insert(announcements)
    .values(body)
    .returning();
  return NextResponse.json(newAnnouncement[0], { status: 201 });
}
