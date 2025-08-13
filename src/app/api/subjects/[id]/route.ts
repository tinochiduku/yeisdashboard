import { NextResponse } from 'next/server';
import { db } from '@/db';
import { subjects } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     description: Returns a single subject by ID
 *     tags:
 *       - Subjects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The subject.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       404:
 *         description: Subject not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db.select().from(subjects).where(eq(subjects.id, id));
  if (data.length === 0) {
    return NextResponse.json({ message: 'Subject not found' }, { status: 404 });
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/subjects/{id}:
 *   put:
 *     description: Updates a subject
 *     tags:
 *       - Subjects
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
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       200:
 *         description: The updated subject.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       404:
 *         description: Subject not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedSubject = await db
    .update(subjects)
    .set(body)
    .where(eq(subjects.id, id))
    .returning();
  if (updatedSubject.length === 0) {
    return NextResponse.json({ message: 'Subject not found' }, { status: 404 });
  }
  return NextResponse.json(updatedSubject[0]);
}

/**
 * @swagger
 * /api/subjects/{id}:
 *   delete:
 *     description: Deletes a subject
 *     tags:
 *       - Subjects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Subject deleted successfully.
 *       404:
 *         description: Subject not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedSubject = await db
    .delete(subjects)
    .where(eq(subjects.id, id))
    .returning();
  if (deletedSubject.length === 0) {
    return NextResponse.json({ message: 'Subject not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
