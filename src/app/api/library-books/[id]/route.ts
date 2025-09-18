import { NextResponse } from 'next/server';
import { db } from '@/db';
import { libraryBooks } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/library-books/{id}:
 *   get:
 *     description: Returns a single library book by ID
 *     tags:
 *       - Library Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The library book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LibraryBook'
 *       404:
 *         description: Library book not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(libraryBooks)
    .where(eq(libraryBooks.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Library book not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/library-books/{id}:
 *   put:
 *     description: Updates a library book
 *     tags:
 *       - Library Books
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
 *             $ref: '#/components/schemas/LibraryBook'
 *     responses:
 *       200:
 *         description: The updated library book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LibraryBook'
 *       404:
 *         description: Library book not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedLibraryBook = await db
    .update(libraryBooks)
    .set(body)
    .where(eq(libraryBooks.id, id))
    .returning();
  if (updatedLibraryBook.length === 0) {
    return NextResponse.json(
      { message: 'Library book not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedLibraryBook[0]);
}

/**
 * @swagger
 * /api/library-books/{id}:
 *   delete:
 *     description: Deletes a library book
 *     tags:
 *       - Library Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Library book deleted successfully.
 *       404:
 *         description: Library book not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedLibraryBook = await db
    .delete(libraryBooks)
    .where(eq(libraryBooks.id, id))
    .returning();
  if (deletedLibraryBook.length === 0) {
    return NextResponse.json(
      { message: 'Library book not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
