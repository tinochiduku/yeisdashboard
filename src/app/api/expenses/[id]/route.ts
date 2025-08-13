import { NextResponse } from 'next/server';
import { db } from '@/db';
import { expenses } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/expenses/{id}:
 *   get:
 *     description: Returns a single expense by ID
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expense.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Expense not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db.select().from(expenses).where(eq(expenses.id, id));
  if (data.length === 0) {
    return NextResponse.json({ message: 'Expense not found' }, { status: 404 });
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     description: Updates an expense
 *     tags:
 *       - Expenses
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
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: The updated expense.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Expense not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedExpense = await db
    .update(expenses)
    .set(body)
    .where(eq(expenses.id, id))
    .returning();
  if (updatedExpense.length === 0) {
    return NextResponse.json({ message: 'Expense not found' }, { status: 404 });
  }
  return NextResponse.json(updatedExpense[0]);
}

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     description: Deletes an expense
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Expense deleted successfully.
 *       404:
 *         description: Expense not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedExpense = await db
    .delete(expenses)
    .where(eq(expenses.id, id))
    .returning();
  if (deletedExpense.length === 0) {
    return NextResponse.json({ message: 'Expense not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
