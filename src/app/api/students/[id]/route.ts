import { NextResponse } from 'next/server';
import { db } from '@/db';
import { students } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     description: Returns a single student by ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The student.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db.select().from(students).where(eq(students.id, id));
  if (data.length === 0) {
    return NextResponse.json({ message: 'Student not found' }, { status: 404 });
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     description: Updates a student
 *     tags:
 *       - Students
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
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: The updated student.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedStudent = await db
    .update(students)
    .set(body)
    .where(eq(students.id, id))
    .returning();
  if (updatedStudent.length === 0) {
    return NextResponse.json({ message: 'Student not found' }, { status: 404 });
  }
  return NextResponse.json(updatedStudent[0]);
}

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     description: Deletes a student
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Student deleted successfully.
 *       404:
 *         description: Student not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedStudent = await db
    .delete(students)
    .where(eq(students.id, id))
    .returning();
  if (deletedStudent.length === 0) {
    return NextResponse.json({ message: 'Student not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
