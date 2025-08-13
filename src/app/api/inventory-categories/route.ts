import { NextResponse } from 'next/server';
import { db } from '@/db';
import { inventoryCategories } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/inventory-categories:
 *   get:
 *     description: Returns all inventory categories
 *     tags:
 *       - Inventory Categories
 *     responses:
 *       200:
 *         description: A list of inventory categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryCategory'
 */
export async function GET() {
  const data = await db.select().from(inventoryCategories);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/inventory-categories:
 *   post:
 *     description: Creates a new inventory category
 *     tags:
 *       - Inventory Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewInventoryCategory'
 *     responses:
 *       201:
 *         description: The created inventory category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryCategory'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newInventoryCategory = await db
    .insert(inventoryCategories)
    .values(body)
    .returning();
  return NextResponse.json(newInventoryCategory[0], { status: 201 });
}
