import { Request, Response } from 'express';
import { supabase, supabaseAdmin } from '../config/supabase';
import pool from '../config/database';
import { AuthRequest } from '../types';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name, university } = req.body;

    // Create auth user in Supabase
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
        university,
        role: 'user',
      },
    });

    if (authError || !authData.user) {
      return res.status(400).json({ error: authError?.message || 'Failed to create user' });
    }

    // Create user profile in database
    const query = `
      INSERT INTO users (id, email, name, university, role)
      VALUES ($1, $2, $3, $4, 'user')
      RETURNING id, email, name, university, role, created_at
    `;
    const values = [authData.user.id, email, name, university];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'User created successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Get user profile from database
    const query = 'SELECT id, email, name, avatar_url, university, phone_number, role FROM users WHERE id = $1';
    const result = await pool.query(query, [data.user.id]);

    res.json({
      message: 'Login successful',
      session: data.session,
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      await supabase.auth.signOut();
    }

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const query = 'SELECT id, email, name, avatar_url, university, phone_number, role FROM users WHERE id = $1';
    const result = await pool.query(query, [req.user.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
