import { NextResponse } from 'next/server';
import { db } from '@/db';
import { staff } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/staff/{id}:
 *   get:
 *     description: Returns a single staff member by ID
 *     tags:
 *       - Staff
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The staff member.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       404:
 *         description: Staff member not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db.select().from(staff).where(eq(staff.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Staff member not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/staff/{id}:
 *   put:
 *     description: Updates a staff member
 *     tags:
 *       - Staff
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
 *             $ref: '#/components/schemas/Staff'
 *     responses:
 *       200:
 *         description: The updated staff member.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       404:
 *         description: Staff member not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedStaff = await db
    .update(staff)
    .set(body)
    .where(eq(staff.id, id))
    .returning();
  if (updatedStaff.length === 0) {
    return NextResponse.json(
      { message: 'Staff member not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedStaff[0]);
}

/**
 * @swagger
 * /api/staff/{id}:
 *   delete:
 *     description: Deletes a staff member
 *     tags:
 *       - Staff
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Staff member deleted successfully.
 *       404:
 *         description: Staff member not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedStaff = await db
    .delete(staff)
    .where(eq(staff.id, id))
    .returning();
  if (deletedStaff.length === 0) {
    return NextResponse.json(
      { message: 'Staff member not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
