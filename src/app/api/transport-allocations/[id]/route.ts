import { NextResponse } from 'next/server';
import { db } from '@/db';
import { transportAllocations } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/transport-allocations/{id}:
 *   get:
 *     description: Returns a single transport allocation by ID
 *     tags:
 *       - Transport Allocations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The transport allocation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransportAllocation'
 *       404:
 *         description: Transport allocation not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(transportAllocations)
    .where(eq(transportAllocations.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Transport allocation not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/transport-allocations/{id}:
 *   put:
 *     description: Updates a transport allocation
 *     tags:
 *       - Transport Allocations
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
 *             $ref: '#/components/schemas/TransportAllocation'
 *     responses:
 *       200:
 *         description: The updated transport allocation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransportAllocation'
 *       404:
 *         description: Transport allocation not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedTransportAllocation = await db
    .update(transportAllocations)
    .set(body)
    .where(eq(transportAllocations.id, id))
    .returning();
  if (updatedTransportAllocation.length === 0) {
    return NextResponse.json(
      { message: 'Transport allocation not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedTransportAllocation[0]);
}

/**
 * @swagger
 * /api/transport-allocations/{id}:
 *   delete:
 *     description: Deletes a transport allocation
 *     tags:
 *       - Transport Allocations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Transport allocation deleted successfully.
 *       404:
 *         description: Transport allocation not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedTransportAllocation = await db
    .delete(transportAllocations)
    .where(eq(transportAllocations.id, id))
    .returning();
  if (deletedTransportAllocation.length === 0) {
    return NextResponse.json(
      { message: 'Transport allocation not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
