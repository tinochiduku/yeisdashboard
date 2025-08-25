import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

if (!process.env.POSTGRES_DATABASE) {
  throw new Error('POSTGRES_DATABASE is not set');
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_DATABASE,
  },
});
