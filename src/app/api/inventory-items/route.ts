import { NextResponse } from 'next/server';
import { db } from '@/db';
import { inventoryItems } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/inventory-items:
 *   get:
 *     description: Returns all inventory items
 *     tags:
 *       - Inventory Items
 *     responses:
 *       200:
 *         description: A list of inventory items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryItem'
 */
export async function GET() {
  const data = await db.select().from(inventoryItems);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/inventory-items:
 *   post:
 *     description: Creates a new inventory item
 *     tags:
 *       - Inventory Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewInventoryItem'
 *     responses:
 *       201:
 *         description: The created inventory item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryItem'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newInventoryItem = await db
    .insert(inventoryItems)
    .values(body)
    .returning();
  return NextResponse.json(newInventoryItem[0], { status: 201 });
}
