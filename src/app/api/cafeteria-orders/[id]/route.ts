import { NextResponse } from 'next/server';
import { db } from '@/db';
import { cafeteriaOrders } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/cafeteria-orders/{id}:
 *   get:
 *     description: Returns a single cafeteria order by ID
 *     tags:
 *       - Cafeteria Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The cafeteria order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CafeteriaOrder'
 *       404:
 *         description: Cafeteria order not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(cafeteriaOrders)
    .where(eq(cafeteriaOrders.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Cafeteria order not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/cafeteria-orders/{id}:
 *   put:
 *     description: Updates a cafeteria order
 *     tags:
 *       - Cafeteria Orders
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
 *             $ref: '#/components/schemas/CafeteriaOrder'
 *     responses:
 *       200:
 *         description: The updated cafeteria order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CafeteriaOrder'
 *       404:
 *         description: Cafeteria order not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedCafeteriaOrder = await db
    .update(cafeteriaOrders)
    .set(body)
    .where(eq(cafeteriaOrders.id, id))
    .returning();
  if (updatedCafeteriaOrder.length === 0) {
    return NextResponse.json(
      { message: 'Cafeteria order not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedCafeteriaOrder[0]);
}

/**
 * @swagger
 * /api/cafeteria-orders/{id}:
 *   delete:
 *     description: Deletes a cafeteria order
 *     tags:
 *       - Cafeteria Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cafeteria order deleted successfully.
 *       404:
 *         description: Cafeteria order not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedCafeteriaOrder = await db
    .delete(cafeteriaOrders)
    .where(eq(cafeteriaOrders.id, id))
    .returning();
  if (deletedCafeteriaOrder.length === 0) {
    return NextResponse.json(
      { message: 'Cafeteria order not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
