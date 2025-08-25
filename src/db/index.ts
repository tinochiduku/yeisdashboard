import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import 'dotenv/config';

if (!process.env.POSTGRES_DATABASE) {
  throw new Error('POSTGRES_DATABASE is not set');
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_DATABASE,
  ssl: true,
});

export const db = drizzle(pool);