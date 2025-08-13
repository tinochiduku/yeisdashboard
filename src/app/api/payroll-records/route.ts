import { NextResponse } from 'next/server';
import { db } from '@/db';
import { payrollRecords } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/payroll-records:
 *   get:
 *     description: Returns all payroll records
 *     tags:
 *       - Payroll Records
 *     responses:
 *       200:
 *         description: A list of payroll records.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PayrollRecord'
 */
export async function GET() {
  const data = await db.select().from(payrollRecords);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/payroll-records:
 *   post:
 *     description: Creates a new payroll record
 *     tags:
 *       - Payroll Records
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPayrollRecord'
 *     responses:
 *       201:
 *         description: The created payroll record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PayrollRecord'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newPayrollRecord = await db
    .insert(payrollRecords)
    .values(body)
    .returning();
  return NextResponse.json(newPayrollRecord[0], { status: 201 });
}
