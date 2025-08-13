import { NextResponse } from 'next/server';
import { db } from '@/db';
import { activities } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/activities:
 *   get:
 *     description: Returns all activities
 *     tags:
 *       - Activities
 *     responses:
 *       200:
 *         description: A list of activities.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 */
export async function GET() {
  const data = await db.select().from(activities);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/activities:
 *   post:
 *     description: Creates a new activity
 *     tags:
 *       - Activities
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewActivity'
 *     responses:
 *       201:
 *         description: The created activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newActivity = await db.insert(activities).values(body).returning();
  return NextResponse.json(newActivity[0], { status: 201 });
}
