import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Returns all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
export async function GET() {
  const data = await db.select().from(users);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/users:
 *   post:
 *     description: Creates a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newUser = await db.insert(users).values(body).returning();
  return NextResponse.json(newUser[0], { status: 201 });
}
