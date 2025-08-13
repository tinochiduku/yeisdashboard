import { NextResponse } from 'next/server';
import { db } from '@/db';
import { transportVehicles } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/transport-vehicles:
 *   get:
 *     description: Returns all transport vehicles
 *     tags:
 *       - Transport Vehicles
 *     responses:
 *       200:
 *         description: A list of transport vehicles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TransportVehicle'
 */
export async function GET() {
  const data = await db.select().from(transportVehicles);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/transport-vehicles:
 *   post:
 *     description: Creates a new transport vehicle
 *     tags:
 *       - Transport Vehicles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTransportVehicle'
 *     responses:
 *       201:
 *         description: The created transport vehicle.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransportVehicle'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newTransportVehicle = await db
    .insert(transportVehicles)
    .values(body)
    .returning();
  return NextResponse.json(newTransportVehicle[0], { status: 201 });
}
