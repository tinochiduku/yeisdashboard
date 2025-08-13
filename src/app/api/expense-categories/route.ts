import { NextResponse } from 'next/server';
import { db } from '@/db';
import { expenseCategories } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/expense-categories:
 *   get:
 *     description: Returns all expense categories
 *     tags:
 *       - Expense Categories
 *     responses:
 *       200:
 *         description: A list of expense categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExpenseCategory'
 */
export async function GET() {
  const data = await db.select().from(expenseCategories);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/expense-categories:
 *   post:
 *     description: Creates a new expense category
 *     tags:
 *       - Expense Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewExpenseCategory'
 *     responses:
 *       201:
 *         description: The created expense category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseCategory'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newExpenseCategory = await db
    .insert(expenseCategories)
    .values(body)
    .returning();
  return NextResponse.json(newExpenseCategory[0], { status: 201 });
}
