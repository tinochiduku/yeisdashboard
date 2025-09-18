import { NextResponse } from 'next/server';
import { db } from '@/db';
import { auditLogs } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/audit-logs/{id}:
 *   get:
 *     description: Returns a single audit log by ID
 *     tags:
 *       - Audit Logs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The audit log.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuditLog'
 *       404:
 *         description: Audit log not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db.select().from(auditLogs).where(eq(auditLogs.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Audit log not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}
