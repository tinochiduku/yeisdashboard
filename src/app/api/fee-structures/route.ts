import { NextResponse } from 'next/server';
import { db } from '@/db';
import { feeStructure } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/fee-structures:
 *   get:
 *     description: Returns all fee structures
 *     tags:
 *       - Fee Structures
 *     responses:
 *       200:
 *         description: A list of fee structures.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FeeStructure'
 */
export async function GET() {
  const data = await db.select().from(feeStructure);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/fee-structures:
 *   post:
 *     description: Creates a new fee structure
 *     tags:
 *       - Fee Structures
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFeeStructure'
 *     responses:
 *       201:
 *         description: The created fee structure.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeeStructure'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newFeeStructure = await db
    .insert(feeStructure)
    .values(body)
    .returning();
  return NextResponse.json(newFeeStructure[0], { status: 201 });
}
