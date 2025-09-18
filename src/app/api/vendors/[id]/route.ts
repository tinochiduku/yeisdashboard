import { NextResponse } from 'next/server';
import { db } from '@/db';
import { vendors } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/vendors/{id}:
 *   get:
 *     description: Returns a single vendor by ID
 *     tags:
 *       - Vendors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The vendor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendor'
 *       404:
 *         description: Vendor not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db.select().from(vendors).where(eq(vendors.id, id));
  if (data.length === 0) {
    return NextResponse.json({ message: 'Vendor not found' }, { status: 404 });
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/vendors/{id}:
 *   put:
 *     description: Updates a vendor
 *     tags:
 *       - Vendors
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
 *             $ref: '#/components/schemas/Vendor'
 *     responses:
 *       200:
 *         description: The updated vendor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendor'
 *       404:
 *         description: Vendor not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedVendor = await db
    .update(vendors)
    .set(body)
    .where(eq(vendors.id, id))
    .returning();
  if (updatedVendor.length === 0) {
    return NextResponse.json({ message: 'Vendor not found' }, { status: 404 });
  }
  return NextResponse.json(updatedVendor[0]);
}

/**
 * @swagger
 * /api/vendors/{id}:
 *   delete:
 *     description: Deletes a vendor
 *     tags:
 *       - Vendors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Vendor deleted successfully.
 *       404:
 *         description: Vendor not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedVendor = await db
    .delete(vendors)
    .where(eq(vendors.id, id))
    .returning();
  if (deletedVendor.length === 0) {
    return NextResponse.json({ message: 'Vendor not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
