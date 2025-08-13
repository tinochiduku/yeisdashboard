import { NextResponse } from 'next/server';
import { db } from '@/db';
import { hostelAllocations } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/hostel-allocations/{id}:
 *   get:
 *     description: Returns a single hostel allocation by ID
 *     tags:
 *       - Hostel Allocations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The hostel allocation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HostelAllocation'
 *       404:
 *         description: Hostel allocation not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(hostelAllocations)
    .where(eq(hostelAllocations.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Hostel allocation not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/hostel-allocations/{id}:
 *   put:
 *     description: Updates a hostel allocation
 *     tags:
 *       - Hostel Allocations
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
 *             $ref: '#/components/schemas/HostelAllocation'
 *     responses:
 *       200:
 *         description: The updated hostel allocation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HostelAllocation'
 *       404:
 *         description: Hostel allocation not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedHostelAllocation = await db
    .update(hostelAllocations)
    .set(body)
    .where(eq(hostelAllocations.id, id))
    .returning();
  if (updatedHostelAllocation.length === 0) {
    return NextResponse.json(
      { message: 'Hostel allocation not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedHostelAllocation[0]);
}

/**
 * @swagger
 * /api/hostel-allocations/{id}:
 *   delete:
 *     description: Deletes a hostel allocation
 *     tags:
 *       - Hostel Allocations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Hostel allocation deleted successfully.
 *       404:
 *         description: Hostel allocation not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedHostelAllocation = await db
    .delete(hostelAllocations)
    .where(eq(hostelAllocations.id, id))
    .returning();
  if (deletedHostelAllocation.length === 0) {
    return NextResponse.json(
      { message: 'Hostel allocation not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
