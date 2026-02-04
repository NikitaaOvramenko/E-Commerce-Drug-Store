import type { Drug } from './drug.types';

export interface User {
  id?: number;
  email: string;
  basketId?: number;
  basketItems: BasketItem[];
}

export interface BasketItem {
  drugDto: Drug;
  quantity: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
}

export interface LoginResponse {
  userDto: User;
  token: string;
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}
