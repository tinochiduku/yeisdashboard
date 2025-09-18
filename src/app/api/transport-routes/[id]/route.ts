import { NextResponse } from 'next/server';
import { db } from '@/db';
import { transportRoutes } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/transport-routes/{id}:
 *   get:
 *     description: Returns a single transport route by ID
 *     tags:
 *       - Transport Routes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The transport route.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransportRoute'
 *       404:
 *         description: Transport route not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(transportRoutes)
    .where(eq(transportRoutes.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Transport route not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/transport-routes/{id}:
 *   put:
 *     description: Updates a transport route
 *     tags:
 *       - Transport Routes
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
 *             $ref: '#/components/schemas/TransportRoute'
 *     responses:
 *       200:
 *         description: The updated transport route.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransportRoute'
 *       404:
 *         description: Transport route not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedTransportRoute = await db
    .update(transportRoutes)
    .set(body)
    .where(eq(transportRoutes.id, id))
    .returning();
  if (updatedTransportRoute.length === 0) {
    return NextResponse.json(
      { message: 'Transport route not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedTransportRoute[0]);
}

/**
 * @swagger
 * /api/transport-routes/{id}:
 *   delete:
 *     description: Deletes a transport route
 *     tags:
 *       - Transport Routes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Transport route deleted successfully.
 *       404:
 *         description: Transport route not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedTransportRoute = await db
    .delete(transportRoutes)
    .where(eq(transportRoutes.id, id))
    .returning();
  if (deletedTransportRoute.length === 0) {
    return NextResponse.json(
      { message: 'Transport route not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
