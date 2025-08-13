import { NextResponse } from 'next/server';
import { db } from '@/db';
import { disciplinaryRecords } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/disciplinary-records:
 *   get:
 *     description: Returns all disciplinary records
 *     tags:
 *       - Disciplinary Records
 *     responses:
 *       200:
 *         description: A list of disciplinary records.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DisciplinaryRecord'
 */
export async function GET() {
  const data = await db.select().from(disciplinaryRecords);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/disciplinary-records:
 *   post:
 *     description: Creates a new disciplinary record
 *     tags:
 *       - Disciplinary Records
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewDisciplinaryRecord'
 *     responses:
 *       201:
 *         description: The created disciplinary record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DisciplinaryRecord'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newDisciplinaryRecord = await db
    .insert(disciplinaryRecords)
    .values(body)
    .returning();
  return NextResponse.json(newDisciplinaryRecord[0], { status: 201 });
}
