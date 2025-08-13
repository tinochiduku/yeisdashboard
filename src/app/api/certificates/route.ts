import { NextResponse } from 'next/server';
import { db } from '@/db';
import { certificates } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /api/certificates:
 *   get:
 *     description: Returns all certificates
 *     tags:
 *       - Certificates
 *     responses:
 *       200:
 *         description: A list of certificates.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Certificate'
 */
export async function GET() {
  const data = await db.select().from(certificates);
  return NextResponse.json(data);
}

/**
 * @swagger
 * /api/certificates:
 *   post:
 *     description: Creates a new certificate
 *     tags:
 *       - Certificates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCertificate'
 *     responses:
 *       201:
 *         description: The created certificate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 */
export async function POST(request: Request) {
  const body = await request.json();
  const newCertificate = await db.insert(certificates).values(body).returning();
  return NextResponse.json(newCertificate[0], { status: 201 });
}
