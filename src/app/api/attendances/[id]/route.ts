import { NextResponse } from 'next/server';
import { db } from '@/db';
import { attendance } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/attendances/{id}:
 *   get:
 *     description: Returns a single attendance record by ID
 *     tags:
 *       - Attendances
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The attendance record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Attendance record not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await db.select().from(attendance).where(eq(attendance.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Attendance record not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/attendances/{id}:
 *   put:
 *     description: Updates an attendance record
 *     tags:
 *       - Attendances
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
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       200:
 *         description: The updated attendance record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Attendance record not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const updatedAttendance = await db
    .update(attendance)
    .set(body)
    .where(eq(attendance.id, id))
    .returning();
  if (updatedAttendance.length === 0) {
    return NextResponse.json(
      { message: 'Attendance record not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedAttendance[0]);
}

/**
 * @swagger
 * /api/attendances/{id}:
 *   delete:
 *     description: Deletes an attendance record
 *     tags:
 *       - Attendances
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Attendance record deleted successfully.
 *       404:
 *         description: Attendance record not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const deletedAttendance = await db
    .delete(attendance)
    .where(eq(attendance.id, id))
    .returning();
  if (deletedAttendance.length === 0) {
    return NextResponse.json(
      { message: 'Attendance record not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
