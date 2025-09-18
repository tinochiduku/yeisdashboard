import { NextResponse } from 'next/server';
import { db } from '@/db';
import { fileStorage } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/file-storage/{id}:
 *   get:
 *     description: Returns a single file storage record by ID
 *     tags:
 *       - File Storage
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The file storage record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileStorage'
 *       404:
 *         description: File storage record not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(fileStorage)
    .where(eq(fileStorage.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'File storage record not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/file-storage/{id}:
 *   put:
 *     description: Updates a file storage record
 *     tags:
 *       - File Storage
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
 *             $ref: '#/components/schemas/FileStorage'
 *     responses:
 *       200:
 *         description: The updated file storage record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileStorage'
 *       404:
 *         description: File storage record not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedFileStorage = await db
    .update(fileStorage)
    .set(body)
    .where(eq(fileStorage.id, id))
    .returning();
  if (updatedFileStorage.length === 0) {
    return NextResponse.json(
      { message: 'File storage record not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedFileStorage[0]);
}

/**
 * @swagger
 * /api/file-storage/{id}:
 *   delete:
 *     description: Deletes a file storage record
 *     tags:
 *       - File Storage
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: File storage record deleted successfully.
 *       404:
 *         description: File storage record not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedFileStorage = await db
    .delete(fileStorage)
    .where(eq(fileStorage.id, id))
    .returning();
  if (deletedFileStorage.length === 0) {
    return NextResponse.json(
      { message: 'File storage record not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
