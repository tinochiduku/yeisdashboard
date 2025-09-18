import { NextResponse } from 'next/server';
import { db } from '@/db';
import { cafeteriaMenus } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/cafeteria-menus/{id}:
 *   get:
 *     description: Returns a single cafeteria menu by ID
 *     tags:
 *       - Cafeteria Menus
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The cafeteria menu.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CafeteriaMenu'
 *       404:
 *         description: Cafeteria menu not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db
    .select()
    .from(cafeteriaMenus)
    .where(eq(cafeteriaMenus.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Cafeteria menu not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/cafeteria-menus/{id}:
 *   put:
 *     description: Updates a cafeteria menu
 *     tags:
 *       - Cafeteria Menus
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
 *             $ref: '#/components/schemas/CafeteriaMenu'
 *     responses:
 *       200:
 *         description: The updated cafeteria menu.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CafeteriaMenu'
 *       404:
 *         description: Cafeteria menu not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedCafeteriaMenu = await db
    .update(cafeteriaMenus)
    .set(body)
    .where(eq(cafeteriaMenus.id, id))
    .returning();
  if (updatedCafeteriaMenu.length === 0) {
    return NextResponse.json(
      { message: 'Cafeteria menu not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedCafeteriaMenu[0]);
}

/**
 * @swagger
 * /api/cafeteria-menus/{id}:
 *   delete:
 *     description: Deletes a cafeteria menu
 *     tags:
 *       - Cafeteria Menus
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cafeteria menu deleted successfully.
 *       404:
 *         description: Cafeteria menu not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedCafeteriaMenu = await db
    .delete(cafeteriaMenus)
    .where(eq(cafeteriaMenus.id, id))
    .returning();
  if (deletedCafeteriaMenu.length === 0) {
    return NextResponse.json(
      { message: 'Cafeteria menu not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
