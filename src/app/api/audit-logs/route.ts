import { NextResponse } from 'next/server';
import { db } from '@/db';
import { auditLogs } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/audit-logs:
 *   get:
 *     description: Returns all audit logs
 *     tags:
 *       - Audit Logs
 *     responses:
 *       200:
 *         description: A list of audit logs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AuditLog'
 */
export async function GET() {
  const data = await db.select().from(auditLogs);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/audit-logs:
 *   post:
 *     description: Creates a new audit log
 *     tags:
 *       - Audit Logs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewAuditLog'
 *     responses:
 *       201:
 *         description: The created audit log.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuditLog'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newAuditLog = await db.insert(auditLogs).values(body).returning();
  return NextResponse.json(newAuditLog[0], { status: 201 });
}
