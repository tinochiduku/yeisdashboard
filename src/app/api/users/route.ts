import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { clerkClient } from "@clerk/nextjs/server";


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
  const { data } =  await (await clerkClient()).users.getUserList();

  const clerk_users = data?.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      email: user.emailAddresses.filter(({ id }) => id === user.primaryEmailAddressId)[0].emailAddress,
      passwordHash: null,
      role: null,
      isActive: false,
      isPending: true,
      lastLogin: null,
      emailVerified: true,
      twoFactorEnabled: false,
  }));

  const db_users = await db.select().from(users);
  const alt_db_users = db_users.map((user) => ({ ...user, isPending: false}))

  const mergedUsers = [
    // Merge matching entries
    ...clerk_users.map(clerkUser => {
        const dbUser = alt_db_users.find(dbUser => dbUser.id === clerkUser.id);
        
        if (dbUser) {
            return {
                ...clerkUser,
                ...dbUser,
                passwordHash: dbUser.passwordHash,
                role: dbUser.role,
                isActive: dbUser.isActive,
                lastLogin: dbUser.lastLogin,
                twoFactorEnabled: dbUser.twoFactorEnabled
            };
        }
        
        return clerkUser;
    }),
    
    // Add db_users that don't exist in clerk_users
    ...db_users.filter(dbUser => 
        !clerk_users.some(clerkUser => clerkUser.id === dbUser.id)
    )
];

  return NextResponse.json(mergedUsers);
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
