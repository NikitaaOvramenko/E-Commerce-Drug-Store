import type { Drug } from "./drug.types";

export interface BasketItem {
  drug: Drug;
  quantity: number;
}

export interface AddToBasketRequest {
  basketId: number;
  drugId: number;
}

// Matches the backend BasketDrugDto
export interface BasketDrugDto {
  drugDto: Drug;
  quantity: number;
}

export interface Basket {
  id: number;
  items: BasketItem[];
  totalPrice: number;
  totalItems: number;
}
