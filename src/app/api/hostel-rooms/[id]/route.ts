import { NextResponse } from 'next/server';
import { db } from '@/db';
import { hostelRooms } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/hostel-rooms/{id}:
 *   get:
 *     description: Returns a single hostel room by ID
 *     tags:
 *       - Hostel Rooms
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The hostel room.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HostelRoom'
 *       404:
 *         description: Hostel room not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(hostelRooms)
    .where(eq(hostelRooms.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Hostel room not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/hostel-rooms/{id}:
 *   put:
 *     description: Updates a hostel room
 *     tags:
 *       - Hostel Rooms
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
 *             $ref: '#/components/schemas/HostelRoom'
 *     responses:
 *       200:
 *         description: The updated hostel room.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HostelRoom'
 *       404:
 *         description: Hostel room not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedHostelRoom = await db
    .update(hostelRooms)
    .set(body)
    .where(eq(hostelRooms.id, id))
    .returning();
  if (updatedHostelRoom.length === 0) {
    return NextResponse.json(
      { message: 'Hostel room not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedHostelRoom[0]);
}

/**
 * @swagger
 * /api/hostel-rooms/{id}:
 *   delete:
 *     description: Deletes a hostel room
 *     tags:
 *       - Hostel Rooms
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Hostel room deleted successfully.
 *       404:
 *         description: Hostel room not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedHostelRoom = await db
    .delete(hostelRooms)
    .where(eq(hostelRooms.id, id))
    .returning();
  if (deletedHostelRoom.length === 0) {
    return NextResponse.json(
      { message: 'Hostel room not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
