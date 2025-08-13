import { NextResponse } from 'next/server';
import { db } from '@/db';
import { expenseCategories } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/expense-categories/{id}:
 *   get:
 *     description: Returns a single expense category by ID
 *     tags:
 *       - Expense Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expense category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseCategory'
 *       404:
 *         description: Expense category not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(expenseCategories)
    .where(eq(expenseCategories.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Expense category not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/expense-categories/{id}:
 *   put:
 *     description: Updates an expense category
 *     tags:
 *       - Expense Categories
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
 *             $ref: '#/components/schemas/ExpenseCategory'
 *     responses:
 *       200:
 *         description: The updated expense category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseCategory'
 *       404:
 *         description: Expense category not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedExpenseCategory = await db
    .update(expenseCategories)
    .set(body)
    .where(eq(expenseCategories.id, id))
    .returning();
  if (updatedExpenseCategory.length === 0) {
    return NextResponse.json(
      { message: 'Expense category not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedExpenseCategory[0]);
}

/**
 * @swagger
 * /api/expense-categories/{id}:
 *   delete:
 *     description: Deletes an expense category
 *     tags:
 *       - Expense Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Expense category deleted successfully.
 *       404:
 *         description: Expense category not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedExpenseCategory = await db
    .delete(expenseCategories)
    .where(eq(expenseCategories.id, id))
    .returning();
  if (deletedExpenseCategory.length === 0) {
    return NextResponse.json(
      { message: 'Expense category not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
