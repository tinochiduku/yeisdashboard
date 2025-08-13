import { NextResponse } from 'next/server';
import { db } from '@/db';
import { systemSettings } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/system-settings/{id}:
 *   get:
 *     description: Returns a single system setting by ID
 *     tags:
 *       - System Settings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The system setting.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SystemSetting'
 *       404:
 *         description: System setting not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(systemSettings)
    .where(eq(systemSettings.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'System setting not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/system-settings/{id}:
 *   put:
 *     description: Updates a system setting
 *     tags:
 *       - System Settings
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
 *             $ref: '#/components/schemas/SystemSetting'
 *     responses:
 *       200:
 *         description: The updated system setting.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SystemSetting'
 *       404:
 *         description: System setting not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedSystemSetting = await db
    .update(systemSettings)
    .set(body)
    .where(eq(systemSettings.id, id))
    .returning();
  if (updatedSystemSetting.length === 0) {
    return NextResponse.json(
      { message: 'System setting not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedSystemSetting[0]);
}

/**
 * @swagger
 * /api/system-settings/{id}:
 *   delete:
 *     description: Deletes a system setting
 *     tags:
 *       - System Settings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: System setting deleted successfully.
 *       404:
 *         description: System setting not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedSystemSetting = await db
    .delete(systemSettings)
    .where(eq(systemSettings.id, id))
    .returning();
  if (deletedSystemSetting.length === 0) {
    return NextResponse.json(
      { message: 'System setting not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
