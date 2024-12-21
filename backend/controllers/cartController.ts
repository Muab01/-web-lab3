import { Request, Response } from 'express';
import { pool } from '../db/db';

const cartController = {
  createCart: async (req: Request, res: Response) => {
    try {
      const result = await pool.query('INSERT INTO Cart DEFAULT VALUES RETURNING id');
      res.status(201).json({ cartId: result.rows[0].id });
    } catch (error) {
      console.error('Error creating cart:', error);
      res.status(500).json({ error: 'Failed to create cart.' });
    }
  },

  addToCart: async (req: Request, res: Response) => {
    const { cartId, menuId, quantity } = req.body;
  
    try {
     
      const existingItem = await pool.query(
        'SELECT id, quantity FROM CartItems WHERE cart_id = $1 AND menu_id = $2',
        [cartId, menuId]
      );
  
      if (existingItem.rows.length > 0) {
        
        await pool.query(
          'UPDATE CartItems SET quantity = $1 WHERE id = $2',
          [existingItem.rows[0].quantity + quantity, existingItem.rows[0].id]
        );
      } else {
        
        await pool.query(
          'INSERT INTO CartItems (cart_id, menu_id, quantity) VALUES ($1, $2, $3)',
          [cartId, menuId, quantity]
        );
      }
  
      res.status(201).json({ message: 'Item added to cart' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Failed to add item to cart.' });
    }
  },
  
  
  getCartItems: async (req: Request, res: Response) => {
    const { cartId } = req.params;

    try {
      
      const result = await pool.query(
        `SELECT m.id, m.name, CAST(m.price AS FLOAT) AS price, m.image_url, SUM(ci.quantity) AS quantity
         FROM CartItems ci
         JOIN Menu m ON ci.menu_id = m.id
         WHERE ci.cart_id = $1
         GROUP BY m.id, m.name, m.price, m.image_url`,
        [cartId]
      );

      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Failed to fetch cart items.' });
    }
  },

  clearCart: async (req: Request, res: Response) => {
    const { cartId } = req.params;

    try {
      await pool.query('DELETE FROM CartItems WHERE cart_id = $1', [cartId]);
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ error: 'Failed to clear cart.' });
    }
  },
};

export default cartController;
