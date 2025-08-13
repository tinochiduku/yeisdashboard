import { NextResponse } from 'next/server';
import { db } from '@/db';
import { systemSettings } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/system-settings:
 *   get:
 *     description: Returns all system settings
 *     tags:
 *       - System Settings
 *     responses:
 *       200:
 *         description: A list of system settings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SystemSetting'
 */
export async function GET() {
  const data = await db.select().from(systemSettings);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/system-settings:
 *   post:
 *     description: Creates a new system setting
 *     tags:
 *       - System Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewSystemSetting'
 *     responses:
 *       201:
 *         description: The created system setting.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SystemSetting'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newSystemSetting = await db
    .insert(systemSettings)
    .values(body)
    .returning();
  return NextResponse.json(newSystemSetting[0], { status: 201 });
}
