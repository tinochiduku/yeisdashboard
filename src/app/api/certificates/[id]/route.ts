import { NextResponse } from 'next/server';
import { db } from '@/db';
import { certificates } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/certificates/{id}:
 *   get:
 *     description: Returns a single certificate by ID
 *     tags:
 *       - Certificates
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The certificate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       404:
 *         description: Certificate not found.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db
    .select()
    .from(certificates)
    .where(eq(certificates.id, id));
  if (data.length === 0) {
    return NextResponse.json(
      { message: 'Certificate not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(data[0]);
}

/**
 * @swagger
 * /api/certificates/{id}:
 *   put:
 *     description: Updates a certificate
 *     tags:
 *       - Certificates
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
 *             $ref: '#/components/schemas/Certificate'
 *     responses:
 *       200:
 *         description: The updated certificate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       404:
 *         description: Certificate not found.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const updatedCertificate = await db
    .update(certificates)
    .set(body)
    .where(eq(certificates.id, id))
    .returning();
  if (updatedCertificate.length === 0) {
    return NextResponse.json(
      { message: 'Certificate not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedCertificate[0]);
}

/**
 * @swagger
 * /api/certificates/{id}:
 *   delete:
 *     description: Deletes a certificate
 *     tags:
 *       - Certificates
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Certificate deleted successfully.
 *       404:
 *         description: Certificate not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const deletedCertificate = await db
    .delete(certificates)
    .where(eq(certificates.id, id))
    .returning();
  if (deletedCertificate.length === 0) {
    return NextResponse.json(
      { message: 'Certificate not found' },
      { status: 404 }
    );
  }
  return new NextResponse(null, { status: 204 });
}
