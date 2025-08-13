import { NextResponse } from 'next/server';
import { db } from '@/db';
import { feeStructure } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/fee-structures/{id}:
 *   get:
 *     description: Returns a single fee structure by ID
 *     tags:
 *       - Fee Structures
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The fee structure.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeeStructure'
 *       404:
 *         description: Fee structure not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(feeStructure)
    .where(eq(feeStructure.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Fee structure not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/fee-structures/{id}:
 *   put:
 *     description: Updates a fee structure
 *     tags:
 *       - Fee Structures
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
 *             $ref: '#/components/schemas/FeeStructure'
 *     responses:
 *       200:
 *         description: The updated fee structure.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeeStructure'
 *       404:
 *         description: Fee structure not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedFeeStructure = await db
    .update(feeStructure)
    .set(body)
    .where(eq(feeStructure.id, id))
    .returning();
  if (updatedFeeStructure.length === 0) {
    return NextResponse.json(
      { message: 'Fee structure not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedFeeStructure[0]);
}

/**
 * @swagger
 * /api/fee-structures/{id}:
 *   delete:
 *     description: Deletes a fee structure
 *     tags:
 *       - Fee Structures
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Fee structure deleted successfully.
 *       404:
 *         description: Fee structure not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedFeeStructure = await db
    .delete(feeStructure)
    .where(eq(feeStructure.id, id))
    .returning();
  if (deletedFeeStructure.length === 0) {
    return NextResponse.json(
      { message: 'Fee structure not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
