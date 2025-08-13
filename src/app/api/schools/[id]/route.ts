import { NextResponse } from 'next/server';
import { db } from '@/db';
import { schools } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/schools/{id}:
 *   get:
 *     description: Returns a single school by ID
 *     tags:
 *       - Schools
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The school.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       404:
 *         description: School not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db.select().from(schools).where(eq(schools.id, id));
  if (data.length === 0) {
    return NextResponse.json({ message: 'School not found' }, { status: 404 });
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/schools/{id}:
 *   put:
 *     description: Updates a school
 *     tags:
 *       - Schools
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
 *             $ref: '#/components/schemas/School'
 *     responses:
 *       200:
 *         description: The updated school.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       404:
 *         description: School not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedSchool = await db
    .update(schools)
    .set(body)
    .where(eq(schools.id, id))
    .returning();
  if (updatedSchool.length === 0) {
    return NextResponse.json({ message: 'School not found' }, { status: 404 });
  }
  return NextResponse.json(updatedSchool[0]);
}

/**
 * @swagger
 * /api/schools/{id}:
 *   delete:
 *     description: Deletes a school
 *     tags:
 *       - Schools
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: School deleted successfully.
 *       404:
 *         description: School not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedSchool = await db
    .delete(schools)
    .where(eq(schools.id, id))
    .returning();
  if (deletedSchool.length === 0) {
    return NextResponse.json({ message: 'School not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
