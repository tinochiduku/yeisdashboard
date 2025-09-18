import { NextResponse } from 'next/server';
import { db } from '@/db';
import { hostels } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/hostels/{id}:
 *   get:
 *     description: Returns a single hostel by ID
 *     tags:
 *       - Hostels
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The hostel.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hostel'
 *       404:
 *         description: Hostel not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db.select().from(hostels).where(eq(hostels.id, id));
  if (data.length === 0) {
    return NextResponse.json({ message: 'Hostel not found' }, { status: 404 });
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/hostels/{id}:
 *   put:
 *     description: Updates a hostel
 *     tags:
 *       - Hostels
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
 *             $ref: '#/components/schemas/Hostel'
 *     responses:
 *       200:
 *         description: The updated hostel.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hostel'
 *       404:
 *         description: Hostel not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedHostel = await db
    .update(hostels)
    .set(body)
    .where(eq(hostels.id, id))
    .returning();
  if (updatedHostel.length === 0) {
    return NextResponse.json({ message: 'Hostel not found' }, { status: 404 });
  }
  return NextResponse.json(updatedHostel[0]);
}

/**
 * @swagger
 * /api/hostels/{id}:
 *   delete:
 *     description: Deletes a hostel
 *     tags:
 *       - Hostels
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Hostel deleted successfully.
 *       404:
 *         description: Hostel not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedHostel = await db
    .delete(hostels)
    .where(eq(hostels.id, id))
    .returning();
  if (deletedHostel.length === 0) {
    return NextResponse.json({ message: 'Hostel not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
