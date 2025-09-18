import { NextResponse } from 'next/server';
import { db } from '@/db';
import { exams } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/exams/{id}:
 *   get:
 *     description: Returns a single exam by ID
 *     tags:
 *       - Exams
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The exam.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       404:
 *         description: Exam not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db.select().from(exams).where(eq(exams.id, id));
  if (data.length === 0) {
    return NextResponse.json({ message: 'Exam not found' }, { status: 404 });
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/exams/{id}:
 *   put:
 *     description: Updates an exam
 *     tags:
 *       - Exams
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
 *             $ref: '#/components/schemas/Exam'
 *     responses:
 *       200:
 *         description: The updated exam.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       404:
 *         description: Exam not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedExam = await db
    .update(exams)
    .set(body)
    .where(eq(exams.id, id))
    .returning();
  if (updatedExam.length === 0) {
    return NextResponse.json({ message: 'Exam not found' }, { status: 404 });
  }
  return NextResponse.json(updatedExam[0]);
}

/**
 * @swagger
 * /api/exams/{id}:
 *   delete:
 *     description: Deletes an exam
 *     tags:
 *       - Exams
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Exam deleted successfully.
 *       404:
 *         description: Exam not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedExam = await db
    .delete(exams)
    .where(eq(exams.id, id))
    .returning();
  if (deletedExam.length === 0) {
    return NextResponse.json({ message: 'Exam not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
