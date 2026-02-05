import type { Drug } from './drug.types';

export interface User {
  id?: number;
  email: string;
  role?: 'USER' | 'ADMIN';
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
