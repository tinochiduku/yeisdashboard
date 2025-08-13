import { NextResponse } from 'next/server';
import { db } from '@/db';
import { hostels } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/hostels:
 *   get:
 *     description: Returns all hostels
 *     tags:
 *       - Hostels
 *     responses:
 *       200:
 *         description: A list of hostels.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hostel'
 */
export async function GET() {
  const data = await db.select().from(hostels);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/hostels:
 *   post:
 *     description: Creates a new hostel
 *     tags:
 *       - Hostels
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewHostel'
 *     responses:
 *       201:
 *         description: The created hostel.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hostel'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newHostel = await db.insert(hostels).values(body).returning();
  return NextResponse.json(newHostel[0], { status: 201 });
}
