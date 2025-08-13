import { NextResponse } from 'next/server';
import { db } from '@/db';
import { cafeteriaOrders } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/cafeteria-orders:
 *   get:
 *     description: Returns all cafeteria orders
 *     tags:
 *       - Cafeteria Orders
 *     responses:
 *       200:
 *         description: A list of cafeteria orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CafeteriaOrder'
 */
export async function GET() {
  const data = await db.select().from(cafeteriaOrders);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/cafeteria-orders:
 *   post:
 *     description: Creates a new cafeteria order
 *     tags:
 *       - Cafeteria Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCafeteriaOrder'
 *     responses:
 *       201:
 *         description: The created cafeteria order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CafeteriaOrder'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newCafeteriaOrder = await db
    .insert(cafeteriaOrders)
    .values(body)
    .returning();
  return NextResponse.json(newCafeteriaOrder[0], { status: 201 });
}
