import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const PGURI: string = process.env.PGURI || '';

if (!PGURI) {
  throw new Error('PGURI is not set in the environment variables.');
}

export const pool = new Pool({
  connectionString: PGURI,
});


pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected. Current time:', res.rows[0]);
  }
});
