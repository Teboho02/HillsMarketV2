import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Warning: Supabase credentials not fully configured');
}

// Client for user-facing operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for backend operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
