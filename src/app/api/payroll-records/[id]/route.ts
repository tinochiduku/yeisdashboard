import { NextResponse } from 'next/server';
import { db } from '@/db';
import { payrollRecords } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/payroll-records/{id}:
 *   get:
 *     description: Returns a single payroll record by ID
 *     tags:
 *       - Payroll Records
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The payroll record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PayrollRecord'
 *       404:
 *         description: Payroll record not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(payrollRecords)
    .where(eq(payrollRecords.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Payroll record not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/payroll-records/{id}:
 *   put:
 *     description: Updates a payroll record
 *     tags:
 *       - Payroll Records
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
 *             $ref: '#/components/schemas/PayrollRecord'
 *     responses:
 *       200:
 *         description: The updated payroll record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PayrollRecord'
 *       404:
 *         description: Payroll record not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedPayrollRecord = await db
    .update(payrollRecords)
    .set(body)
    .where(eq(payrollRecords.id, id))
    .returning();
  if (updatedPayrollRecord.length === 0) {
    return NextResponse.json(
      { message: 'Payroll record not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedPayrollRecord[0]);
}

/**
 * @swagger
 * /api/payroll-records/{id}:
 *   delete:
 *     description: Deletes a payroll record
 *     tags:
 *       - Payroll Records
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Payroll record deleted successfully.
 *       404:
 *         description: Payroll record not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedPayrollRecord = await db
    .delete(payrollRecords)
    .where(eq(payrollRecords.id, id))
    .returning();
  if (deletedPayrollRecord.length === 0) {
    return NextResponse.json(
      { message: 'Payroll record not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
