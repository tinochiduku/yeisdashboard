import { NextResponse } from 'next/server';
import { db } from '@/db';
import { payrollStructure } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/payroll-structures:
 *   get:
 *     description: Returns all payroll structures
 *     tags:
 *       - Payroll Structures
 *     responses:
 *       200:
 *         description: A list of payroll structures.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PayrollStructure'
 */
export async function GET() {
  const data = await db.select().from(payrollStructure);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/payroll-structures:
 *   post:
 *     description: Creates a new payroll structure
 *     tags:
 *       - Payroll Structures
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPayrollStructure'
 *     responses:
 *       201:
 *         description: The created payroll structure.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PayrollStructure'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newPayrollStructure = await db
    .insert(payrollStructure)
    .values(body)
    .returning();
  return NextResponse.json(newPayrollStructure[0], { status: 201 });
}
