import { NextResponse } from 'next/server';
import { db } from '@/db';
import { announcements } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/announcements/{id}:
 *   get:
 *     description: Returns a single announcement by ID
 *     tags:
 *       - Announcements
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The announcement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       404:
 *         description: Announcement not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(announcements)
    .where(eq(announcements.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Announcement not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/announcements/{id}:
 *   put:
 *     description: Updates an announcement
 *     tags:
 *       - Announcements
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
 *             $ref: '#/components/schemas/Announcement'
 *     responses:
 *       200:
 *         description: The updated announcement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       404:
 *         description: Announcement not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedAnnouncement = await db
    .update(announcements)
    .set(body)
    .where(eq(announcements.id, id))
    .returning();
  if (updatedAnnouncement.length === 0) {
    return NextResponse.json(
      { message: 'Announcement not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedAnnouncement[0]);
}

/**
 * @swagger
 * /api/announcements/{id}:
 *   delete:
 *     description: Deletes an announcement
 *     tags:
 *       - Announcements
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Announcement deleted successfully.
 *       404:
 *         description: Announcement not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedAnnouncement = await db
    .delete(announcements)
    .where(eq(announcements.id, id))
    .returning();
  if (deletedAnnouncement.length === 0) {
    return NextResponse.json(
      { message: 'Announcement not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
