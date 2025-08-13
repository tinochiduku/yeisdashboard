import { NextResponse } from 'next/server';
import { db } from '@/db';
import { transportAllocations } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/transport-allocations:
 *   get:
 *     description: Returns all transport allocations
 *     tags:
 *       - Transport Allocations
 *     responses:
 *       200:
 *         description: A list of transport allocations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TransportAllocation'
 */
export async function GET() {
  const data = await db.select().from(transportAllocations);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/transport-allocations:
 *   post:
 *     description: Creates a new transport allocation
 *     tags:
 *       - Transport Allocations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTransportAllocation'
 *     responses:
 *       201:
 *         description: The created transport allocation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransportAllocation'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newTransportAllocation = await db
    .insert(transportAllocations)
    .values(body)
    .returning();
  return NextResponse.json(newTransportAllocation[0], { status: 201 });
}
