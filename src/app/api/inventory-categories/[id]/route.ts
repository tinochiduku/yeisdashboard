import { NextResponse } from 'next/server';
import { db } from '@/db';
import { inventoryCategories } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/inventory-categories/{id}:
 *   get:
 *     description: Returns a single inventory category by ID
 *     tags:
 *       - Inventory Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The inventory category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryCategory'
 *       404:
 *         description: Inventory category not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(inventoryCategories)
    .where(eq(inventoryCategories.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Inventory category not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/inventory-categories/{id}:
 *   put:
 *     description: Updates an inventory category
 *     tags:
 *       - Inventory Categories
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
 *             $ref: '#/components/schemas/InventoryCategory'
 *     responses:
 *       200:
 *         description: The updated inventory category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryCategory'
 *       404:
 *         description: Inventory category not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedInventoryCategory = await db
    .update(inventoryCategories)
    .set(body)
    .where(eq(inventoryCategories.id, id))
    .returning();
  if (updatedInventoryCategory.length === 0) {
    return NextResponse.json(
      { message: 'Inventory category not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedInventoryCategory[0]);
}

/**
 * @swagger
 * /api/inventory-categories/{id}:
 *   delete:
 *     description: Deletes an inventory category
 *     tags:
 *       - Inventory Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Inventory category deleted successfully.
 *       404:
 *         description: Inventory category not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedInventoryCategory = await db
    .delete(inventoryCategories)
    .where(eq(inventoryCategories.id, id))
    .returning();
  if (deletedInventoryCategory.length === 0) {
    return NextResponse.json(
      { message: 'Inventory category not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
