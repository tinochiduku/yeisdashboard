import { NextResponse } from 'next/server';
import { db } from '@/db';
import { examSubjects } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/exam-subjects/{id}:
 *   get:
 *     description: Returns a single exam subject by ID
 *     tags:
 *       - Exam Subjects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The exam subject.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExamSubject'
 *       404:
 *         description: Exam subject not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(examSubjects)
    .where(eq(examSubjects.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Exam subject not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/exam-subjects/{id}:
 *   put:
 *     description: Updates an exam subject
 *     tags:
 *       - Exam Subjects
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
 *             $ref: '#/components/schemas/ExamSubject'
 *     responses:
 *       200:
 *         description: The updated exam subject.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExamSubject'
 *       404:
 *         description: Exam subject not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedExamSubject = await db
    .update(examSubjects)
    .set(body)
    .where(eq(examSubjects.id, id))
    .returning();
  if (updatedExamSubject.length === 0) {
    return NextResponse.json(
      { message: 'Exam subject not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedExamSubject[0]);
}

/**
 * @swagger
 * /api/exam-subjects/{id}:
 *   delete:
 *     description: Deletes an exam subject
 *     tags:
 *       - Exam Subjects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Exam subject deleted successfully.
 *       404:
 *         description: Exam subject not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedExamSubject = await db
    .delete(examSubjects)
    .where(eq(examSubjects.id, id))
    .returning();
  if (deletedExamSubject.length === 0) {
    return NextResponse.json(
      { message: 'Exam subject not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
