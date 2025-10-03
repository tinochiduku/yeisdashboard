import { NextResponse } from 'next/server';
import { db } from '@/db';
import { staff } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/staff:
 *   get:
 *     description: Returns all staff
 *     tags:
 *       - Staff
 *     responses:
 *       200:
 *         description: A list of staff.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 */
export async function GET() {
  const data = await db.select().from(staff).where(eq(staff.staffType, 'teaching'));
  const teachers = data.map((teacher) => ({
    ...teacher, 
    name: `${teacher.firstName} ${teacher.lastName}`
  }))
  return NextResponse.json(teachers);
}
