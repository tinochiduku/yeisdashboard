import { NextResponse } from 'next/server';
import { db } from '@/db';
import { grades } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/grades/{id}:
 *   get:
 *     description: Returns a single grade by ID
 *     tags:
 *       - Grades
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The grade.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       404:
 *         description: Grade not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db.select().from(grades).where(eq(grades.id, id));
  if (data.length === 0) {
    return NextResponse.json({ message: 'Grade not found' }, { status: 404 });
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/grades/{id}:
 *   put:
 *     description: Updates a grade
 *     tags:
 *       - Grades
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
 *             $ref: '#/components/schemas/Grade'
 *     responses:
 *       200:
 *         description: The updated grade.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       404:
 *         description: Grade not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedGrade = await db
    .update(grades)
    .set(body)
    .where(eq(grades.id, id))
    .returning();
  if (updatedGrade.length === 0) {
    return NextResponse.json({ message: 'Grade not found' }, { status: 404 });
  }
  return NextResponse.json(updatedGrade[0]);
}

/**
 * @swagger
 * /api/grades/{id}:
 *   delete:
 *     description: Deletes a grade
 *     tags:
 *       - Grades
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Grade deleted successfully.
 *       404:
 *         description: Grade not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedGrade = await db
    .delete(grades)
    .where(eq(grades.id, id))
    .returning();
  if (deletedGrade.length === 0) {
    return NextResponse.json({ message: 'Grade not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
