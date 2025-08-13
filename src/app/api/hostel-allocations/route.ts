import { NextResponse } from 'next/server';
import { db } from '@/db';
import { hostelAllocations } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/hostel-allocations:
 *   get:
 *     description: Returns all hostel allocations
 *     tags:
 *       - Hostel Allocations
 *     responses:
 *       200:
 *         description: A list of hostel allocations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HostelAllocation'
 */
export async function GET() {
  const data = await db.select().from(hostelAllocations);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/hostel-allocations:
 *   post:
 *     description: Creates a new hostel allocation
 *     tags:
 *       - Hostel Allocations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewHostelAllocation'
 *     responses:
 *       201:
 *         description: The created hostel allocation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HostelAllocation'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newHostelAllocation = await db
    .insert(hostelAllocations)
    .values(body)
    .returning();
  return NextResponse.json(newHostelAllocation[0], { status: 201 });
}
