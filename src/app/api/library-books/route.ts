import { NextResponse } from 'next/server';
import { db } from '@/db';
import { libraryBooks } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/library-books:
 *   get:
 *     description: Returns all library books
 *     tags:
 *       - Library Books
 *     responses:
 *       200:
 *         description: A list of library books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LibraryBook'
 */
export async function GET() {
  const data = await db.select().from(libraryBooks);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/library-books:
 *   post:
 *     description: Creates a new library book
 *     tags:
 *       - Library Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewLibraryBook'
 *     responses:
 *       201:
 *         description: The created library book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LibraryBook'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newLibraryBook = await db.insert(libraryBooks).values(body).returning();
  return NextResponse.json(newLibraryBook[0], { status: 201 });
}
