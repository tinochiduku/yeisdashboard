import { NextResponse } from 'next/server';
import { db } from '@/db';
import { cafeteriaMenus } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/cafeteria-menus:
 *   get:
 *     description: Returns all cafeteria menus
 *     tags:
 *       - Cafeteria Menus
 *     responses:
 *       200:
 *         description: A list of cafeteria menus.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CafeteriaMenu'
 */
export async function GET() {
  const data = await db.select().from(cafeteriaMenus);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/cafeteria-menus:
 *   post:
 *     description: Creates a new cafeteria menu
 *     tags:
 *       - Cafeteria Menus
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCafeteriaMenu'
 *     responses:
 *       201:
 *         description: The created cafeteria menu.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CafeteriaMenu'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newCafeteriaMenu = await db
    .insert(cafeteriaMenus)
    .values(body)
    .returning();
  return NextResponse.json(newCafeteriaMenu[0], { status: 201 });
}
