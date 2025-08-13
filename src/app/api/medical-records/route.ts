import { NextResponse } from 'next/server';
import { db } from '@/db';
import { medicalRecords } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/medical-records:
 *   get:
 *     description: Returns all medical records
 *     tags:
 *       - Medical Records
 *     responses:
 *       200:
 *         description: A list of medical records.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MedicalRecord'
 */
export async function GET() {
  const data = await db.select().from(medicalRecords);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/medical-records:
 *   post:
 *     description: Creates a new medical record
 *     tags:
 *       - Medical Records
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewMedicalRecord'
 *     responses:
 *       201:
 *         description: The created medical record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicalRecord'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newMedicalRecord = await db
    .insert(medicalRecords)
    .values(body)
    .returning();
  return NextResponse.json(newMedicalRecord[0], { status: 201 });
}
