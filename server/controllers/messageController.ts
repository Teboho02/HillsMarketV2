import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../types';

export const getMyConversations = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const query = `
      SELECT DISTINCT ON (c.id)
        c.*,
        p.title as product_title,
        p.image_urls as product_images,
        p.price as product_price,
        buyer.name as buyer_name,
        buyer.avatar_url as buyer_avatar,
        seller.name as seller_name,
        seller.avatar_url as seller_avatar,
        m.text as last_message,
        m.created_at as last_message_time
      FROM conversations c
      LEFT JOIN products p ON c.product_id = p.id
      LEFT JOIN users buyer ON c.buyer_id = buyer.id
      LEFT JOIN users seller ON c.seller_id = seller.id
      LEFT JOIN LATERAL (
        SELECT text, created_at
        FROM messages
        WHERE conversation_id = c.id
        ORDER BY created_at DESC
        LIMIT 1
      ) m ON true
      WHERE c.buyer_id = $1 OR c.seller_id = $1
      ORDER BY c.id, m.created_at DESC NULLS LAST
    `;
    const result = await pool.query(query, [req.user.id]);

    res.json({ conversations: result.rows });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getConversationMessages = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { id } = req.params;

    // Verify user is part of conversation
    const convQuery = 'SELECT * FROM conversations WHERE id = $1 AND (buyer_id = $2 OR seller_id = $2)';
    const convResult = await pool.query(convQuery, [id, req.user.id]);

    if (convResult.rows.length === 0) {
      return res.status(403).json({ error: 'Not authorized to view this conversation' });
    }

    const query = `
      SELECT m.*, u.name as sender_name, u.avatar_url as sender_avatar
      FROM messages m
      LEFT JOIN users u ON m.sender_id = u.id
      WHERE m.conversation_id = $1
      ORDER BY m.created_at ASC
    `;
    const result = await pool.query(query, [id]);

    res.json({ messages: result.rows });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { conversationId, text } = req.body;

    // Verify user is part of conversation
    const convQuery = 'SELECT * FROM conversations WHERE id = $1 AND (buyer_id = $2 OR seller_id = $2)';
    const convResult = await pool.query(convQuery, [conversationId, req.user.id]);

    if (convResult.rows.length === 0) {
      return res.status(403).json({ error: 'Not authorized to send messages in this conversation' });
    }

    const query = `
      INSERT INTO messages (conversation_id, sender_id, text)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [conversationId, req.user.id, text];
    const result = await pool.query(query, values);

    // Update conversation timestamp
    await pool.query('UPDATE conversations SET updated_at = NOW() WHERE id = $1', [conversationId]);

    res.status(201).json({
      message: 'Message sent successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createConversation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { productId, sellerId } = req.body;

    // Check if conversation already exists
    const checkQuery = `
      SELECT * FROM conversations
      WHERE product_id = $1 AND buyer_id = $2 AND seller_id = $3
    `;
    const checkResult = await pool.query(checkQuery, [productId, req.user.id, sellerId]);

    if (checkResult.rows.length > 0) {
      return res.json({
        message: 'Conversation already exists',
        conversation: checkResult.rows[0],
      });
    }

    // Create new conversation
    const query = `
      INSERT INTO conversations (product_id, buyer_id, seller_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [productId, req.user.id, sellerId];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Conversation created successfully',
      conversation: result.rows[0],
    });
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
