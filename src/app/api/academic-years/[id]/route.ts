import { NextResponse } from 'next/server';
import { db } from '@/db';
import { academicYears } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/academic-years/{id}:
 *   get:
 *     description: Returns a single academic year by ID
 *     tags:
 *       - Academic Years
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The academic year.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AcademicYear'
 *       404:
 *         description: Academic year not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(academicYears)
    .where(eq(academicYears.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Academic year not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/academic-years/{id}:
 *   put:
 *     description: Updates an academic year
 *     tags:
 *       - Academic Years
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
 *             $ref: '#/components/schemas/AcademicYear'
 *     responses:
 *       200:
 *         description: The updated academic year.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AcademicYear'
 *       404:
 *         description: Academic year not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedAcademicYear = await db
    .update(academicYears)
    .set(body)
    .where(eq(academicYears.id, id))
    .returning();
  if (updatedAcademicYear.length === 0) {
    return NextResponse.json(
      { message: 'Academic year not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedAcademicYear[0]);
}

/**
 * @swagger
 * /api/academic-years/{id}:
 *   delete:
 *     description: Deletes an academic year
 *     tags:
 *       - Academic Years
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Academic year deleted successfully.
 *       404:
 *         description: Academic year not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedAcademicYear = await db
    .delete(academicYears)
    .where(eq(academicYears.id, id))
    .returning();
  if (deletedAcademicYear.length === 0) {
    return NextResponse.json(
      { message: 'Academic year not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
