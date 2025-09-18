import { NextResponse } from 'next/server';
import { db } from '@/db';
import { purchaseOrders } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/purchase-orders/{id}:
 *   get:
 *     description: Returns a single purchase order by ID
 *     tags:
 *       - Purchase Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The purchase order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseOrder'
 *       404:
 *         description: Purchase order not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(purchaseOrders)
    .where(eq(purchaseOrders.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Purchase order not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/purchase-orders/{id}:
 *   put:
 *     description: Updates a purchase order
 *     tags:
 *       - Purchase Orders
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
 *             $ref: '#/components/schemas/PurchaseOrder'
 *     responses:
 *       200:
 *         description: The updated purchase order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseOrder'
 *       404:
 *         description: Purchase order not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedPurchaseOrder = await db
    .update(purchaseOrders)
    .set(body)
    .where(eq(purchaseOrders.id, id))
    .returning();
  if (updatedPurchaseOrder.length === 0) {
    return NextResponse.json(
      { message: 'Purchase order not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedPurchaseOrder[0]);
}

/**
 * @swagger
 * /api/purchase-orders/{id}:
 *   delete:
 *     description: Deletes a purchase order
 *     tags:
 *       - Purchase Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Purchase order deleted successfully.
 *       404:
 *         description: Purchase order not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedPurchaseOrder = await db
    .delete(purchaseOrders)
    .where(eq(purchaseOrders.id, id))
    .returning();
  if (deletedPurchaseOrder.length === 0) {
    return NextResponse.json(
      { message: 'Purchase order not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
