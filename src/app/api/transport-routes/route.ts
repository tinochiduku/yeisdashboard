import { NextResponse } from 'next/server';
import { db } from '@/db';
import { transportRoutes } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/transport-routes:
 *   get:
 *     description: Returns all transport routes
 *     tags:
 *       - Transport Routes
 *     responses:
 *       200:
 *         description: A list of transport routes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TransportRoute'
 */
export async function GET() {
  const data = await db.select().from(transportRoutes);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/transport-routes:
 *   post:
 *     description: Creates a new transport route
 *     tags:
 *       - Transport Routes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTransportRoute'
 *     responses:
 *       201:
 *         description: The created transport route.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransportRoute'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newTransportRoute = await db
    .insert(transportRoutes)
    .values(body)
    .returning();
  return NextResponse.json(newTransportRoute[0], { status: 201 });
}
