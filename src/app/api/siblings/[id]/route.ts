import { NextResponse } from 'next/server';
import { db } from '@/db';
import { siblings } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/siblings/{id}:
 *   get:
 *     description: Returns a single sibling relationship by ID
 *     tags:
 *       - Siblings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The sibling relationship.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sibling'
 *       404:
 *         description: Sibling relationship not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db.select().from(siblings).where(eq(siblings.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Sibling relationship not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/siblings/{id}:
 *   put:
 *     description: Updates a sibling relationship
 *     tags:
 *       - Siblings
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
 *             $ref: '#/components/schemas/Sibling'
 *     responses:
 *       200:
 *         description: The updated sibling relationship.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sibling'
 *       404:
 *         description: Sibling relationship not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedSibling = await db
    .update(siblings)
    .set(body)
    .where(eq(siblings.id, id))
    .returning();
  if (updatedSibling.length === 0) {
    return NextResponse.json(
      { message: 'Sibling relationship not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedSibling[0]);
}

/**
 * @swagger
 * /api/siblings/{id}:
 *   delete:
 *     description: Deletes a sibling relationship
 *     tags:
 *       - Siblings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Sibling relationship deleted successfully.
 *       404:
 *         description: Sibling relationship not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedSibling = await db
    .delete(siblings)
    .where(eq(siblings.id, id))
    .returning();
  if (deletedSibling.length === 0) {
    return NextResponse.json(
      { message: 'Sibling relationship not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
