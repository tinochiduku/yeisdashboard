import { NextResponse } from 'next/server';
import { db } from '@/db';
import { payrollStructure } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/payroll-structures/{id}:
 *   get:
 *     description: Returns a single payroll structure by ID
 *     tags:
 *       - Payroll Structures
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The payroll structure.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PayrollStructure'
 *       404:
 *         description: Payroll structure not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(payrollStructure)
    .where(eq(payrollStructure.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Payroll structure not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/payroll-structures/{id}:
 *   put:
 *     description: Updates a payroll structure
 *     tags:
 *       - Payroll Structures
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
 *             $ref: '#/components/schemas/PayrollStructure'
 *     responses:
 *       200:
 *         description: The updated payroll structure.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PayrollStructure'
 *       404:
 *         description: Payroll structure not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedPayrollStructure = await db
    .update(payrollStructure)
    .set(body)
    .where(eq(payrollStructure.id, id))
    .returning();
  if (updatedPayrollStructure.length === 0) {
    return NextResponse.json(
      { message: 'Payroll structure not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedPayrollStructure[0]);
}

/**
 * @swagger
 * /api/payroll-structures/{id}:
 *   delete:
 *     description: Deletes a payroll structure
 *     tags:
 *       - Payroll Structures
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Payroll structure deleted successfully.
 *       404:
 *         description: Payroll structure not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedPayrollStructure = await db
    .delete(payrollStructure)
    .where(eq(payrollStructure.id, id))
    .returning();
  if (deletedPayrollStructure.length === 0) {
    return NextResponse.json(
      { message: 'Payroll structure not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
