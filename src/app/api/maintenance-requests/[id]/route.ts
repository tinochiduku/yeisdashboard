import { NextResponse } from 'next/server';
import { db } from '@/db';
import { maintenanceRequests } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/maintenance-requests/{id}:
 *   get:
 *     description: Returns a single maintenance request by ID
 *     tags:
 *       - Maintenance Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The maintenance request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceRequest'
 *       404:
 *         description: Maintenance request not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(maintenanceRequests)
    .where(eq(maintenanceRequests.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Maintenance request not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/maintenance-requests/{id}:
 *   put:
 *     description: Updates a maintenance request
 *     tags:
 *       - Maintenance Requests
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
 *             $ref: '#/components/schemas/MaintenanceRequest'
 *     responses:
 *       200:
 *         description: The updated maintenance request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceRequest'
 *       404:
 *         description: Maintenance request not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedMaintenanceRequest = await db
    .update(maintenanceRequests)
    .set(body)
    .where(eq(maintenanceRequests.id, id))
    .returning();
  if (updatedMaintenanceRequest.length === 0) {
    return NextResponse.json(
      { message: 'Maintenance request not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedMaintenanceRequest[0]);
}

/**
 * @swagger
 * /api/maintenance-requests/{id}:
 *   delete:
 *     description: Deletes a maintenance request
 *     tags:
 *       - Maintenance Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Maintenance request deleted successfully.
 *       404:
 *         description: Maintenance request not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedMaintenanceRequest = await db
    .delete(maintenanceRequests)
    .where(eq(maintenanceRequests.id, id))
    .returning();
  if (deletedMaintenanceRequest.length === 0) {
    return NextResponse.json(
      { message: 'Maintenance request not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
