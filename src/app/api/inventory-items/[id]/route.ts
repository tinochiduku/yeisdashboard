import { NextResponse } from 'next/server';
import { db } from '@/db';
import { inventoryItems } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/inventory-items/{id}:
 *   get:
 *     description: Returns a single inventory item by ID
 *     tags:
 *       - Inventory Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The inventory item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryItem'
 *       404:
 *         description: Inventory item not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(inventoryItems)
    .where(eq(inventoryItems.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Inventory item not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/inventory-items/{id}:
 *   put:
 *     description: Updates an inventory item
 *     tags:
 *       - Inventory Items
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
 *             $ref: '#/components/schemas/InventoryItem'
 *     responses:
 *       200:
 *         description: The updated inventory item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryItem'
 *       404:
 *         description: Inventory item not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedInventoryItem = await db
    .update(inventoryItems)
    .set(body)
    .where(eq(inventoryItems.id, id))
    .returning();
  if (updatedInventoryItem.length === 0) {
    return NextResponse.json(
      { message: 'Inventory item not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedInventoryItem[0]);
}

/**
 * @swagger
 * /api/inventory-items/{id}:
 *   delete:
 *     description: Deletes an inventory item
 *     tags:
 *       - Inventory Items
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Inventory item deleted successfully.
 *       404:
 *         description: Inventory item not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedInventoryItem = await db
    .delete(inventoryItems)
    .where(eq(inventoryItems.id, id))
    .returning();
  if (deletedInventoryItem.length === 0) {
    return NextResponse.json(
      { message: 'Inventory item not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
