import { Request, Response } from 'express';
import { pool } from '../db/db';

const orderController = {
 
  createOrder: async (req: Request, res: Response) => {
    const { customer_name, customer_contact, pickup_or_dine_in, total_price, items } = req.body;
    try {
      const client = await pool.connect(); 
      await client.query('BEGIN');
  
      const orderResult = await client.query(
        'INSERT INTO Orders (customer_name, customer_contact, pickup_or_dine_in, total_price) VALUES ($1, $2, $3, $4) RETURNING id',
        [customer_name, customer_contact, pickup_or_dine_in, total_price]
      );
  
      const orderId = orderResult.rows[0].id;
  
      for (const item of items) {
        await client.query(
          'INSERT INTO OrderItems (order_id, menu_id, quantity, price) VALUES ($1, $2, $3, $4)',
          [orderId, item.menu_id, item.quantity, item.price]
        );
      }
  
      await client.query('COMMIT');
      res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order.' });
    }
  }
  
}

export default orderController;
