import { NextResponse } from 'next/server';
import { db } from '@/db';
import { communications } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/communications/{id}:
 *   get:
 *     description: Returns a single communication by ID
 *     tags:
 *       - Communications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The communication.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Communication'
 *       404:
 *         description: Communication not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(communications)
    .where(eq(communications.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Communication not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/communications/{id}:
 *   put:
 *     description: Updates a communication
 *     tags:
 *       - Communications
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
 *             $ref: '#/components/schemas/Communication'
 *     responses:
 *       200:
 *         description: The updated communication.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Communication'
 *       404:
 *         description: Communication not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedCommunication = await db
    .update(communications)
    .set(body)
    .where(eq(communications.id, id))
    .returning();
  if (updatedCommunication.length === 0) {
    return NextResponse.json(
      { message: 'Communication not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedCommunication[0]);
}

/**
 * @swagger
 * /api/communications/{id}:
 *   delete:
 *     description: Deletes a communication
 *     tags:
 *       - Communications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Communication deleted successfully.
 *       404:
 *         description: Communication not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedCommunication = await db
    .delete(communications)
    .where(eq(communications.id, id))
    .returning();
  if (deletedCommunication.length === 0) {
    return NextResponse.json(
      { message: 'Communication not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
