import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../types';

export const getAllProducts = async (req: AuthRequest, res: Response) => {
  try {
    const { university, category, minPrice, maxPrice, search } = req.query;

    let query = `
      SELECT p.*, u.name as seller_name, u.avatar_url as seller_avatar
      FROM products p
      LEFT JOIN users u ON p.seller_id = u.id
      WHERE 1=1
    `;
    const values: any[] = [];
    let paramCount = 1;

    if (university) {
      query += ` AND p.university = $${paramCount}`;
      values.push(university);
      paramCount++;
    }

    if (category) {
      query += ` AND p.category = $${paramCount}`;
      values.push(category);
      paramCount++;
    }

    if (minPrice) {
      query += ` AND p.price >= $${paramCount}`;
      values.push(minPrice);
      paramCount++;
    }

    if (maxPrice) {
      query += ` AND p.price <= $${paramCount}`;
      values.push(maxPrice);
      paramCount++;
    }

    if (search) {
      query += ` AND (p.title ILIKE $${paramCount} OR p.description ILIKE $${paramCount})`;
      values.push(`%${search}%`);
      paramCount++;
    }

    query += ' ORDER BY p.created_at DESC';

    const result = await pool.query(query, values);
    res.json({ products: result.rows });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProductById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT p.*, u.name as seller_name, u.avatar_url as seller_avatar, u.university as seller_university
      FROM products p
      LEFT JOIN users u ON p.seller_id = u.id
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product: result.rows[0] });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { title, description, price, category, condition, imageUrls, university } = req.body;

    const query = `
      INSERT INTO products (title, description, price, category, condition, image_urls, seller_id, university)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [title, description, price, category, condition, imageUrls, req.user.id, university];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Product created successfully',
      product: result.rows[0],
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { id } = req.params;
    const { title, description, price, category, condition, imageUrls, university } = req.body;

    // Check if product belongs to user
    const checkQuery = 'SELECT seller_id FROM products WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (checkResult.rows[0].seller_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this product' });
    }

    const query = `
      UPDATE products
      SET title = $1, description = $2, price = $3, category = $4, condition = $5, image_urls = $6, university = $7, updated_at = NOW()
      WHERE id = $8
      RETURNING *
    `;
    const values = [title, description, price, category, condition, imageUrls, university, id];
    const result = await pool.query(query, values);

    res.json({
      message: 'Product updated successfully',
      product: result.rows[0],
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { id } = req.params;

    // Check if product belongs to user
    const checkQuery = 'SELECT seller_id FROM products WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (checkResult.rows[0].seller_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this product' });
    }

    const query = 'DELETE FROM products WHERE id = $1';
    await pool.query(query, [id]);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMyProducts = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const query = 'SELECT * FROM products WHERE seller_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [req.user.id]);

    res.json({ products: result.rows });
  } catch (error) {
    console.error('Get my products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
