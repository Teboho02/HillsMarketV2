import { Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { AuthRequest } from '../types';

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify the token with Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email || '',
      role: user.user_metadata?.role || 'user',
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
