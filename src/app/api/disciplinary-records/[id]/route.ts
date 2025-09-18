import { NextResponse } from 'next/server';
import { db } from '@/db';
import { disciplinaryRecords } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/disciplinary-records/{id}:
 *   get:
 *     description: Returns a single disciplinary record by ID
 *     tags:
 *       - Disciplinary Records
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The disciplinary record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DisciplinaryRecord'
 *       404:
 *         description: Disciplinary record not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(disciplinaryRecords)
    .where(eq(disciplinaryRecords.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Disciplinary record not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/disciplinary-records/{id}:
 *   put:
 *     description: Updates a disciplinary record
 *     tags:
 *       - Disciplinary Records
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
 *             $ref: '#/components/schemas/DisciplinaryRecord'
 *     responses:
 *       200:
 *         description: The updated disciplinary record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DisciplinaryRecord'
 *       404:
 *         description: Disciplinary record not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedDisciplinaryRecord = await db
    .update(disciplinaryRecords)
    .set(body)
    .where(eq(disciplinaryRecords.id, id))
    .returning();
  if (updatedDisciplinaryRecord.length === 0) {
    return NextResponse.json(
      { message: 'Disciplinary record not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedDisciplinaryRecord[0]);
}

/**
 * @swagger
 * /api/disciplinary-records/{id}:
 *   delete:
 *     description: Deletes a disciplinary record
 *     tags:
 *       - Disciplinary Records
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Disciplinary record deleted successfully.
 *       404:
 *         description: Disciplinary record not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedDisciplinaryRecord = await db
    .delete(disciplinaryRecords)
    .where(eq(disciplinaryRecords.id, id))
    .returning();
  if (deletedDisciplinaryRecord.length === 0) {
    return NextResponse.json(
      { message: 'Disciplinary record not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
