import { NextResponse } from 'next/server';
import { db } from '@/db';
import { visitors } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/visitors/{id}:
 *   get:
 *     description: Returns a single visitor by ID
 *     tags:
 *       - Visitors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The visitor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visitor'
 *       404:
 *         description: Visitor not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db.select().from(visitors).where(eq(visitors.id, id));
  if (data.length === 0) {
    return NextResponse.json({ message: 'Visitor not found' }, { status: 404 });
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/visitors/{id}:
 *   put:
 *     description: Updates a visitor
 *     tags:
 *       - Visitors
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
 *             $ref: '#/components/schemas/Visitor'
 *     responses:
 *       200:
 *         description: The updated visitor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visitor'
 *       404:
 *         description: Visitor not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedVisitor = await db
    .update(visitors)
    .set(body)
    .where(eq(visitors.id, id))
    .returning();
  if (updatedVisitor.length === 0) {
    return NextResponse.json({ message: 'Visitor not found' }, { status: 404 });
  }
  return NextResponse.json(updatedVisitor[0]);
}

/**
 * @swagger
 * /api/visitors/{id}:
 *   delete:
 *     description: Deletes a visitor
 *     tags:
 *       - Visitors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Visitor deleted successfully.
 *       404:
 *         description: Visitor not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedVisitor = await db
    .delete(visitors)
    .where(eq(visitors.id, id))
    .returning();
  if (deletedVisitor.length === 0) {
    return NextResponse.json({ message: 'Visitor not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
