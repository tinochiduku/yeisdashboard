import { NextResponse } from 'next/server';
import { db } from '@/db';
import { purchaseOrders } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/purchase-orders:
 *   get:
 *     description: Returns all purchase orders
 *     tags:
 *       - Purchase Orders
 *     responses:
 *       200:
 *         description: A list of purchase orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseOrder'
 */
export async function GET() {
  const data = await db.select().from(purchaseOrders);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/purchase-orders:
 *   post:
 *     description: Creates a new purchase order
 *     tags:
 *       - Purchase Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPurchaseOrder'
 *     responses:
 *       201:
 *         description: The created purchase order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseOrder'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newPurchaseOrder = await db
    .insert(purchaseOrders)
    .values(body)
    .returning();
  return NextResponse.json(newPurchaseOrder[0], { status: 201 });
}
