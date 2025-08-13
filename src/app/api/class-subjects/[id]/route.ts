import { NextResponse } from 'next/server';
import { db } from '@/db';
import { classSubjects } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/class-subjects/{id}:
 *   get:
 *     description: Returns a single class-subject assignment by ID
 *     tags:
 *       - Class Subjects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The class-subject assignment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassSubject'
 *       404:
 *         description: Class-subject assignment not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(classSubjects)
    .where(eq(classSubjects.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Class-subject assignment not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/class-subjects/{id}:
 *   put:
 *     description: Updates a class-subject assignment
 *     tags:
 *       - Class Subjects
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
 *             $ref: '#/components/schemas/ClassSubject'
 *     responses:
 *       200:
 *         description: The updated class-subject assignment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassSubject'
 *       404:
 *         description: Class-subject assignment not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedClassSubject = await db
    .update(classSubjects)
    .set(body)
    .where(eq(classSubjects.id, id))
    .returning();
  if (updatedClassSubject.length === 0) {
    return NextResponse.json(
      { message: 'Class-subject assignment not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedClassSubject[0]);
}

/**
 * @swagger
 * /api/class-subjects/{id}:
 *   delete:
 *     description: Deletes a class-subject assignment
 *     tags:
 *       - Class Subjects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Class-subject assignment deleted successfully.
 *       404:
 *         description: Class-subject assignment not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedClassSubject = await db
    .delete(classSubjects)
    .where(eq(classSubjects.id, id))
    .returning();
  if (deletedClassSubject.length === 0) {
    return NextResponse.json(
      { message: 'Class-subject assignment not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
