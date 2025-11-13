import { Response } from 'express';
import pool from '../config/database';
import { supabaseAdmin } from '../config/supabase';
import { AuthRequest } from '../types';

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const query = `
      SELECT id, email, name, avatar_url, university, phone_number, role, created_at
      FROM users
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);

    res.json({ users: result.rows });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUserRole = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Update in database
    const query = 'UPDATE users SET role = $1 WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [role, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update in Supabase auth metadata
    await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: { role },
    });

    res.json({
      message: 'User role updated successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    // Delete from Supabase auth
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    // Delete from database (cascade will handle related records)
    const query = 'DELETE FROM users WHERE id = $1';
    await pool.query(query, [userId]);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllProductsAdmin = async (req: AuthRequest, res: Response) => {
  try {
    const query = `
      SELECT p.*, u.name as seller_name, u.email as seller_email
      FROM products p
      LEFT JOIN users u ON p.seller_id = u.id
      ORDER BY p.created_at DESC
    `;
    const result = await pool.query(query);

    res.json({ products: result.rows });
  } catch (error) {
    console.error('Get all products admin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProductAdmin = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const query = 'DELETE FROM products WHERE id = $1';
    const result = await pool.query(query, [productId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product admin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getStatistics = async (req: AuthRequest, res: Response) => {
  try {
    const statsQuery = `
      SELECT
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM products) as total_products,
        (SELECT COUNT(*) FROM conversations) as total_conversations,
        (SELECT COUNT(*) FROM messages) as total_messages,
        (SELECT COUNT(*) FROM users WHERE role = 'admin') as admin_count,
        (SELECT AVG(price) FROM products) as avg_product_price
    `;
    const statsResult = await pool.query(statsQuery);

    const recentUsersQuery = 'SELECT COUNT(*) as count FROM users WHERE created_at > NOW() - INTERVAL \'7 days\'';
    const recentUsersResult = await pool.query(recentUsersQuery);

    const recentProductsQuery = 'SELECT COUNT(*) as count FROM products WHERE created_at > NOW() - INTERVAL \'7 days\'';
    const recentProductsResult = await pool.query(recentProductsQuery);

    res.json({
      statistics: {
        ...statsResult.rows[0],
        recent_users: recentUsersResult.rows[0].count,
        recent_products: recentProductsResult.rows[0].count,
      },
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
