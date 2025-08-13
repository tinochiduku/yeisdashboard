import { NextResponse } from 'next/server';
import { db } from '@/db';
import { vendors } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/vendors:
 *   get:
 *     description: Returns all vendors
 *     tags:
 *       - Vendors
 *     responses:
 *       200:
 *         description: A list of vendors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vendor'
 */
export async function GET() {
  const data = await db.select().from(vendors);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/vendors:
 *   post:
 *     description: Creates a new vendor
 *     tags:
 *       - Vendors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewVendor'
 *     responses:
 *       201:
 *         description: The created vendor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendor'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newVendor = await db.insert(vendors).values(body).returning();
  return NextResponse.json(newVendor[0], { status: 201 });
}
