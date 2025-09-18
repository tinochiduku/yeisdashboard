import { NextResponse } from 'next/server';
import { db } from '@/db';
import { feePayments } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/fee-payments/{id}:
 *   get:
 *     description: Returns a single fee payment by ID
 *     tags:
 *       - Fee Payments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The fee payment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeePayment'
 *       404:
 *         description: Fee payment not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(feePayments)
    .where(eq(feePayments.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Fee payment not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/fee-payments/{id}:
 *   put:
 *     description: Updates a fee payment
 *     tags:
 *       - Fee Payments
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
 *             $ref: '#/components/schemas/FeePayment'
 *     responses:
 *       200:
 *         description: The updated fee payment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeePayment'
 *       404:
_
 *         description: Fee payment not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedFeePayment = await db
    .update(feePayments)
    .set(body)
    .where(eq(feePayments.id, id))
    .returning();
  if (updatedFeePayment.length === 0) {
    return NextResponse.json(
      { message: 'Fee payment not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedFeePayment[0]);
}

/**
 * @swagger
 * /api/fee-payments/{id}:
 *   delete:
 *     description: Deletes a fee payment
 *     tags:
 *       - Fee Payments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Fee payment deleted successfully.
 *       404:
 *         description: Fee payment not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedFeePayment = await db
    .delete(feePayments)
    .where(eq(feePayments.id, id))
    .returning();
  if (deletedFeePayment.length === 0) {
    return NextResponse.json(
      { message: 'Fee payment not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
