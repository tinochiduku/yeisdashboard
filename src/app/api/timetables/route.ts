import { NextResponse } from 'next/server';
import { db } from '@/db';
import { timetable } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/timetables:
 *   get:
 *     description: Returns all timetables
 *     tags:
 *       - Timetables
 *     responses:
 *       200:
 *         description: A list of timetables.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Timetable'
 */
export async function GET() {
  const data = await db.select().from(timetable);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/timetables:
 *   post:
 *     description: Creates a new timetable
 *     tags:
 *       - Timetables
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTimetable'
 *     responses:
 *       201:
 *         description: The created timetable.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Timetable'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newTimetable = await db.insert(timetable).values(body).returning();
  return NextResponse.json(newTimetable[0], { status: 201 });
}
