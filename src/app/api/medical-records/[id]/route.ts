import { NextResponse } from 'next/server';
import { db } from '@/db';
import { medicalRecords } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/medical-records/{id}:
 *   get:
 *     description: Returns a single medical record by ID
 *     tags:
 *       - Medical Records
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The medical record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicalRecord'
 *       404:
 *         description: Medical record not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(medicalRecords)
    .where(eq(medicalRecords.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Medical record not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/medical-records/{id}:
 *   put:
 *     description: Updates a medical record
 *     tags:
 *       - Medical Records
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
 *             $ref: '#/components/schemas/MedicalRecord'
 *     responses:
 *       200:
 *         description: The updated medical record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicalRecord'
 *       404:
 *         description: Medical record not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedMedicalRecord = await db
    .update(medicalRecords)
    .set(body)
    .where(eq(medicalRecords.id, id))
    .returning();
  if (updatedMedicalRecord.length === 0) {
    return NextResponse.json(
      { message: 'Medical record not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedMedicalRecord[0]);
}

/**
 * @swagger
 * /api/medical-records/{id}:
 *   delete:
 *     description: Deletes a medical record
 *     tags:
 *       - Medical Records
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Medical record deleted successfully.
 *       404:
 *         description: Medical record not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedMedicalRecord = await db
    .delete(medicalRecords)
    .where(eq(medicalRecords.id, id))
    .returning();
  if (deletedMedicalRecord.length === 0) {
    return NextResponse.json(
      { message: 'Medical record not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
