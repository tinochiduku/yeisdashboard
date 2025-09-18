import { NextResponse } from 'next/server';
import { db } from '@/db';
import { studentParents } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/student-parents/{id}:
 *   get:
 *     description: Returns a single student-parent relationship by ID
 *     tags:
 *       - Student Parents
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The student-parent relationship.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentParent'
 *       404:
 *         description: Student-parent relationship not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(studentParents)
    .where(eq(studentParents.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Student-parent relationship not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/student-parents/{id}:
 *   put:
 *     description: Updates a student-parent relationship
 *     tags:
 *       - Student Parents
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
 *             $ref: '#/components/schemas/StudentParent'
 *     responses:
 *       200:
 *         description: The updated student-parent relationship.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentParent'
 *       404:
 *         description: Student-parent relationship not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedStudentParent = await db
    .update(studentParents)
    .set(body)
    .where(eq(studentParents.id, id))
    .returning();
  if (updatedStudentParent.length === 0) {
    return NextResponse.json(
      { message: 'Student-parent relationship not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedStudentParent[0]);
}

/**
 * @swagger
 * /api/student-parents/{id}:
 *   delete:
 *     description: Deletes a student-parent relationship
 *     tags:
 *       - Student Parents
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Student-parent relationship deleted successfully.
 *       404:
 *         description: Student-parent relationship not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedStudentParent = await db
    .delete(studentParents)
    .where(eq(studentParents.id, id))
    .returning();
  if (deletedStudentParent.length === 0) {
    return NextResponse.json(
      { message: 'Student-parent relationship not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
