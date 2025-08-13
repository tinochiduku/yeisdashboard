import { NextResponse } from 'next/server';
import { db } from '@/db';
import { libraryIssues } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/library-issues/{id}:
 *   get:
 *     description: Returns a single library issue by ID
 *     tags:
 *       - Library Issues
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The library issue.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LibraryIssue'
 *       404:
 *         description: Library issue not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(libraryIssues)
    .where(eq(libraryIssues.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Library issue not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/library-issues/{id}:
 *   put:
 *     description: Updates a library issue
 *     tags:
 *       - Library Issues
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
 *             $ref: '#/components/schemas/LibraryIssue'
 *     responses:
 *       200:
 *         description: The updated library issue.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LibraryIssue'
 *       404:
 *         description: Library issue not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedLibraryIssue = await db
    .update(libraryIssues)
    .set(body)
    .where(eq(libraryIssues.id, id))
    .returning();
  if (updatedLibraryIssue.length === 0) {
    return NextResponse.json(
      { message: 'Library issue not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedLibraryIssue[0]);
}

/**
 * @swagger
 * /api/library-issues/{id}:
 *   delete:
 *     description: Deletes a library issue
 *     tags:
 *       - Library Issues
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Library issue deleted successfully.
 *       404:
 *         description: Library issue not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedLibraryIssue = await db
    .delete(libraryIssues)
    .where(eq(libraryIssues.id, id))
    .returning();
  if (deletedLibraryIssue.length === 0) {
    return NextResponse.json(
      { message: 'Library issue not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
