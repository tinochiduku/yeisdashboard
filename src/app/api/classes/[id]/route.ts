import { NextResponse } from 'next/server';
import { db } from '@/db';
import { classes } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     description: Returns a single class by ID
 *     tags:
 *       - Classes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The class.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db.select().from(classes).where(eq(classes.id, id));
  if (data.length === 0) {
    return NextResponse.json({ message: 'Class not found' }, { status: 404 });
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/classes/{id}:
 *   put:
 *     description: Updates a class
 *     tags:
 *       - Classes
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
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: The updated class.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedClass = await db
    .update(classes)
    .set(body)
    .where(eq(classes.id, id))
    .returning();
  if (updatedClass.length === 0) {
    return NextResponse.json({ message: 'Class not found' }, { status: 404 });
  }
  return NextResponse.json(updatedClass[0]);
}

/**
 * @swagger
 * /api/classes/{id}:
 *   delete:
 *     description: Deletes a class
 *     tags:
 *       - Classes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Class deleted successfully.
 *       404:
 *         description: Class not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedClass = await db
    .delete(classes)
    .where(eq(classes.id, id))
    .returning();
  if (deletedClass.length === 0) {
    return NextResponse.json({ message: 'Class not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
