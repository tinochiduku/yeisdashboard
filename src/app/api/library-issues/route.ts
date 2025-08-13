import { NextResponse } from 'next/server';
import { db } from '@/db';
import { libraryIssues } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/library-issues:
 *   get:
 *     description: Returns all library issues
 *     tags:
 *       - Library Issues
 *     responses:
 *       200:
 *         description: A list of library issues.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LibraryIssue'
 */
export async function GET() {
  const data = await db.select().from(libraryIssues);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/library-issues:
 *   post:
 *     description: Creates a new library issue
 *     tags:
 *       - Library Issues
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewLibraryIssue'
 *     responses:
 *       201:
 *         description: The created library issue.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LibraryIssue'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newLibraryIssue = await db
    .insert(libraryIssues)
    .values(body)
    .returning();
  return NextResponse.json(newLibraryIssue[0], { status: 201 });
}
