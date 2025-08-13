import { NextResponse } from 'next/server';
import { db } from '@/db';
import { studentParents } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/student-parents:
 *   get:
 *     description: Returns all student-parent relationships
 *     tags:
 *       - Student Parents
 *     responses:
 *       200:
 *         description: A list of student-parent relationships.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudentParent'
 */
export async function GET() {
  const data = await db.select().from(studentParents);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/student-parents:
 *   post:
 *     description: Creates a new student-parent relationship
 *     tags:
 *       - Student Parents
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewStudentParent'
 *     responses:
 *       201:
 *         description: The created student-parent relationship.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentParent'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newStudentParent = await db
    .insert(studentParents)
    .values(body)
    .returning();
  return NextResponse.json(newStudentParent[0], { status: 201 });
}
