import { Request, Response } from 'express';
import { pool } from '../db/db';

const menuController = {
  getMenuItems: async (req: Request, res: Response) => {
    try {
      const result = await pool.query(`
        SELECT id, name, description, CAST(price AS FLOAT) AS price, image_url, created_at
        FROM Menu
      `);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ error: 'Failed to fetch menu items.' });
    }
  },
};

export default menuController;
