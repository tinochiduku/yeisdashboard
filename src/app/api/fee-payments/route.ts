import { NextResponse } from 'next/server';
import { db } from '@/db';
import { feePayments } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/fee-payments:
 *   get:
 *     description: Returns all fee payments
 *     tags:
 *       - Fee Payments
 *     responses:
 *       200:
 *         description: A list of fee payments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FeePayment'
 */
export async function GET() {
  const data = await db.select().from(feePayments);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/fee-payments:
 *   post:
 *     description: Creates a new fee payment
 *     tags:
 *       - Fee Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFeePayment'
 *     responses:
 *       201:
 *         description: The created fee payment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeePayment'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newFeePayment = await db.insert(feePayments).values(body).returning();
  return NextResponse.json(newFeePayment[0], { status: 201 });
}
