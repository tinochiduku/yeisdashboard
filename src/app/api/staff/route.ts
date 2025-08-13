import { NextResponse } from 'next/server';
import { db } from '@/db';
import { staff } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/staff:
 *   get:
 *     description: Returns all staff
 *     tags:
 *       - Staff
 *     responses:
 *       200:
 *         description: A list of staff.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 */
export async function GET() {
  const data = await db.select().from(staff);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/staff:
 *   post:
 *     description: Creates a new staff member
 *     tags:
 *       - Staff
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewStaff'
 *     responses:
 *       201:
 *         description: The created staff member.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newStaff = await db.insert(staff).values(body).returning();
  return NextResponse.json(newStaff[0], { status: 201 });
}
