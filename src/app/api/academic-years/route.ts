import { NextResponse } from 'next/server';
import { db } from '@/db';
import { academicYears } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/academic-years:
 *   get:
 *     description: Returns all academic years
 *     tags:
 *       - Academic Years
 *     responses:
 *       200:
 *         description: A list of academic years.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AcademicYear'
 */
export async function GET() {
  const data = await db.select().from(academicYears);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/academic-years:
 *   post:
 *     description: Creates a new academic year
 *     tags:
 *       - Academic Years
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewAcademicYear'
 *     responses:
 *       201:
 *         description: The created academic year.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AcademicYear'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newAcademicYear = await db
    .insert(academicYears)
    .values(body)
    .returning();
  return NextResponse.json(newAcademicYear[0], { status: 201 });
}
