export type View = 'landing' | 'browse' | 'dashboard' | 'messages' | 'productDetail' | 'createListing' | 'editListing' | 'settings' | 'admin';

export interface User {
  id: number;
  name: string;
  avatarUrl: string;
  university: string;
  phoneNumber?: string;
  role?: 'user' | 'admin';
}

export type ItemCondition = 'New' | 'Like New' | 'Good' | 'Fair';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: ItemCondition;
  imageUrls: string[];
  sellerId: number;
  university: string;
}

export interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: number;
  productId: number;
  participantIds: number[];
  messages: Message[];
}