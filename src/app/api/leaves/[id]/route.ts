import { NextResponse } from 'next/server';
import { db } from '@/db';
import { leaves } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/leaves/{id}:
 *   get:
 *     description: Returns a single leave by ID
 *     tags:
 *       - Leaves
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The leave.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leave'
 *       404:
 *         description: Leave not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db.select().from(leaves).where(eq(leaves.id, id));
  if (data.length === 0) {
    return NextResponse.json({ message: 'Leave not found' }, { status: 404 });
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/leaves/{id}:
 *   put:
 *     description: Updates a leave
 *     tags:
 *       - Leaves
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
 *             $ref: '#/components/schemas/Leave'
 *     responses:
 *       200:
 *         description: The updated leave.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leave'
 *       404:
 *         description: Leave not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedLeave = await db
    .update(leaves)
    .set(body)
    .where(eq(leaves.id, id))
    .returning();
  if (updatedLeave.length === 0) {
    return NextResponse.json({ message: 'Leave not found' }, { status: 404 });
  }
  return NextResponse.json(updatedLeave[0]);
}

/**
 * @swagger
 * /api/leaves/{id}:
 *   delete:
 *     description: Deletes a leave
 *     tags:
 *       - Leaves
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Leave deleted successfully.
 *       404:
 *         description: Leave not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedLeave = await db
    .delete(leaves)
    .where(eq(leaves.id, id))
    .returning();
  if (deletedLeave.length === 0) {
    return NextResponse.json({ message: 'Leave not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
