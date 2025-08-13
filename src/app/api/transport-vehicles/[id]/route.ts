import { NextResponse } from 'next/server';
import { db } from '@/db';
import { transportVehicles } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/transport-vehicles/{id}:
 *   get:
 *     description: Returns a single transport vehicle by ID
 *     tags:
 *       - Transport Vehicles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The transport vehicle.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransportVehicle'
 *       404:
 *         description: Transport vehicle not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(transportVehicles)
    .where(eq(transportVehicles.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Transport vehicle not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/transport-vehicles/{id}:
 *   put:
 *     description: Updates a transport vehicle
 *     tags:
 *       - Transport Vehicles
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
 *             $ref: '#/components/schemas/TransportVehicle'
 *     responses:
 *       200:
 *         description: The updated transport vehicle.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransportVehicle'
 *       404:
 *         description: Transport vehicle not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedTransportVehicle = await db
    .update(transportVehicles)
    .set(body)
    .where(eq(transportVehicles.id, id))
    .returning();
  if (updatedTransportVehicle.length === 0) {
    return NextResponse.json(
      { message: 'Transport vehicle not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedTransportVehicle[0]);
}

/**
 * @swagger
 * /api/transport-vehicles/{id}:
 *   delete:
 *     description: Deletes a transport vehicle
 *     tags:
 *       - Transport Vehicles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Transport vehicle deleted successfully.
 *       404:
 *         description: Transport vehicle not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedTransportVehicle = await db
    .delete(transportVehicles)
    .where(eq(transportVehicles.id, id))
    .returning();
  if (deletedTransportVehicle.length === 0) {
    return NextResponse.json(
      { message: 'Transport vehicle not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
