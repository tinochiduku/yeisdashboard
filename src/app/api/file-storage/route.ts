import { NextResponse } from 'next/server';
import { db } from '@/db';
import { fileStorage } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/file-storage:
 *   get:
 *     description: Returns all file storage records
 *     tags:
 *       - File Storage
 *     responses:
 *       200:
 *         description: A list of file storage records.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FileStorage'
 */
export async function GET() {
  const data = await db.select().from(fileStorage);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/file-storage:
 *   post:
 *     description: Creates a new file storage record
 *     tags:
 *       - File Storage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFileStorage'
 *     responses:
 *       201:
 *         description: The created file storage record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileStorage'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newFileStorage = await db.insert(fileStorage).values(body).returning();
  return NextResponse.json(newFileStorage[0], { status: 201 });
}
