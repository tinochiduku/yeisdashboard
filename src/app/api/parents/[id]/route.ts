import { NextResponse } from 'next/server';
import { db } from '@/db';
import { parents } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/parents/{id}:
 *   get:
 *     description: Returns a single parent by ID
 *     tags:
 *       - Parents
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The parent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parent'
 *       404:
 *         description: Parent not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db.select().from(parents).where(eq(parents.id, id));
  if (data.length === 0) {
    return NextResponse.json({ message: 'Parent not found' }, { status: 404 });
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/parents/{id}:
 *   put:
 *     description: Updates a parent
 *     tags:
 *       - Parents
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
 *             $ref: '#/components/schemas/Parent'
 *     responses:
 *       200:
 *         description: The updated parent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parent'
 *       404:
 *         description: Parent not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedParent = await db
    .update(parents)
    .set(body)
    .where(eq(parents.id, id))
    .returning();
  if (updatedParent.length === 0) {
    return NextResponse.json({ message: 'Parent not found' }, { status: 404 });
  }
  return NextResponse.json(updatedParent[0]);
}

/**
 * @swagger
 * /api/parents/{id}:
 *   delete:
 *     description: Deletes a parent
 *     tags:
 *       - Parents
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Parent deleted successfully.
 *       404:
 *         description: Parent not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedParent = await db
    .delete(parents)
    .where(eq(parents.id, id))
    .returning();
  if (deletedParent.length === 0) {
    return NextResponse.json({ message: 'Parent not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
