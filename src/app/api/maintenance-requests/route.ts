import { NextResponse } from 'next/server';
import { db } from '@/db';
import { maintenanceRequests } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/maintenance-requests:
 *   get:
 *     description: Returns all maintenance requests
 *     tags:
 *       - Maintenance Requests
 *     responses:
 *       200:
 *         description: A list of maintenance requests.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MaintenanceRequest'
 */
export async function GET() {
  const data = await db.select().from(maintenanceRequests);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/maintenance-requests:
 *   post:
 *     description: Creates a new maintenance request
 *     tags:
 *       - Maintenance Requests
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewMaintenanceRequest'
 *     responses:
 *       201:
 *         description: The created maintenance request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceRequest'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newMaintenanceRequest = await db
    .insert(maintenanceRequests)
    .values(body)
    .returning();
  return NextResponse.json(newMaintenanceRequest[0], { status: 201 });
}
