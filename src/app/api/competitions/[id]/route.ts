import { NextResponse } from 'next/server';
import { db } from '@/db';
import { competitions } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/competitions/{id}:
 *   get:
 *     description: Returns a single competition by ID
 *     tags:
 *       - Competitions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The competition.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Competition'
 *       404:
 *         description: Competition not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(competitions)
    .where(eq(competitions.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Competition not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/competitions/{id}:
 *   put:
 *     description: Updates a competition
 *     tags:
 *       - Competitions
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
 *             $ref: '#/components/schemas/Competition'
 *     responses:
 *       200:
 *         description: The updated competition.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Competition'
 *       404:
 *         description: Competition not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedCompetition = await db
    .update(competitions)
    .set(body)
    .where(eq(competitions.id, id))
    .returning();
  if (updatedCompetition.length === 0) {
    return NextResponse.json(
      { message: 'Competition not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedCompetition[0]);
}

/**
 * @swagger
 * /api/competitions/{id}:
 *   delete:
 *     description: Deletes a competition
 *     tags:
 *       - Competitions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Competition deleted successfully.
 *       404:
 *         description: Competition not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedCompetition = await db
    .delete(competitions)
    .where(eq(competitions.id, id))
    .returning();
  if (deletedCompetition.length === 0) {
    return NextResponse.json(
      { message: 'Competition not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
