import { Request } from 'express';

export interface AuthUser {
  id: string;
  email: string;
  role?: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  image_urls: string[];
  seller_id: string;
  university: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  university: string;
  phone_number?: string;
  role: 'user' | 'admin';
  created_at?: Date;
  updated_at?: Date;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: string;
  text: string;
  created_at?: Date;
}

export interface Conversation {
  id: number;
  product_id: number;
  buyer_id: string;
  seller_id: string;
  created_at?: Date;
  updated_at?: Date;
}
