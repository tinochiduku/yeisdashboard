import { NextResponse } from 'next/server';
import { db } from '@/db';
import { hostelRooms } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/hostel-rooms:
 *   get:
 *     description: Returns all hostel rooms
 *     tags:
 *       - Hostel Rooms
 *     responses:
 *       200:
 *         description: A list of hostel rooms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HostelRoom'
 */
export async function GET() {
  const data = await db.select().from(hostelRooms);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/hostel-rooms:
 *   post:
 *     description: Creates a new hostel room
 *     tags:
 *       - Hostel Rooms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewHostelRoom'
 *     responses:
 *       201:
 *         description: The created hostel room.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HostelRoom'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newHostelRoom = await db.insert(hostelRooms).values(body).returning();
  return NextResponse.json(newHostelRoom[0], { status: 201 });
}
