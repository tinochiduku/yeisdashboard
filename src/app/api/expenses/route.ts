import { NextResponse } from 'next/server';
import { db } from '@/db';
import { expenses } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     description: Returns all expenses
 *     tags:
 *       - Expenses
 *     responses:
 *       200:
 *         description: A list of expenses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 */
export async function GET() {
  const data = await db.select().from(expenses);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     description: Creates a new expense
 *     tags:
 *       - Expenses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewExpense'
 *     responses:
 *       201:
 *         description: The created expense.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newExpense = await db.insert(expenses).values(body).returning();
  return NextResponse.json(newExpense[0], { status: 201 });
}
