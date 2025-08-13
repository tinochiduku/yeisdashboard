import { NextResponse } from 'next/server';
import { db } from '@/db';
import { terms } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/terms/{id}:
 *   get:
 *     description: Returns a single term by ID
 *     tags:
 *       - Terms
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The term.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Term'
 *       404:
 *         description: Term not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db.select().from(terms).where(eq(terms.id, id));
  if (data.length === 0) {
    return NextResponse.json({ message: 'Term not found' }, { status: 404 });
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/terms/{id}:
 *   put:
 *     description: Updates a term
 *     tags:
 *       - Terms
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
 *             $ref: '#/components/schemas/Term'
 *     responses:
 *       200:
 *         description: The updated term.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Term'
 *       404:
 *         description: Term not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedTerm = await db
    .update(terms)
    .set(body)
    .where(eq(terms.id, id))
    .returning();
  if (updatedTerm.length === 0) {
    return NextResponse.json({ message: 'Term not found' }, { status: 404 });
  }
  return NextResponse.json(updatedTerm[0]);
}

/**
 * @swagger
 * /api/terms/{id}:
 *   delete:
 *     description: Deletes a term
 *     tags:
 *       - Terms
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Term deleted successfully.
 *       404:
 *         description: Term not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedTerm = await db
    .delete(terms)
    .where(eq(terms.id, id))
    .returning();
  if (deletedTerm.length === 0) {
    return NextResponse.json({ message: 'Term not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
