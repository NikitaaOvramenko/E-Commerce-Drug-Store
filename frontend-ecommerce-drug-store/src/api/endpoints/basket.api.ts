import apiClient from "../apiClient";
import type { AddToBasketRequest, BasketDto } from "../types/basket.types";

export const basketApi = {
  // Get basket with items and total price
  getBasket: async (basketId: number): Promise<BasketDto> => {
    const response = await apiClient.get<BasketDto>(
      `/api/basket/${basketId}`
    );
    return response.data;
  },

  // Add item to basket
  addItem: async (drugId: number, basketId: number): Promise<BasketDto> => {
    const data: AddToBasketRequest = { drugId, basketId };
    const response = await apiClient.post<BasketDto>("/api/basket/add", data);
    return response.data;
  },

  // Remove item from basket
  removeItem: async (basketId: number, drugId: number): Promise<BasketDto> => {
    const response = await apiClient.delete<BasketDto>(
      `/api/basket/${basketId}/item/${drugId}`
    );
    return response.data;
  },

  // Update item quantity
  updateQuantity: async (
    basketId: number,
    drugId: number,
    quantity: number
  ): Promise<BasketDto> => {
    const response = await apiClient.put<BasketDto>(
      `/api/basket/${basketId}/item/${drugId}`,
      { quantity }
    );
    return response.data;
  },

  // Clear all items from basket
  clearBasket: async (basketId: number): Promise<BasketDto> => {
    const response = await apiClient.delete<BasketDto>(
      `/api/basket/${basketId}/clear`
    );
    return response.data;
  },
};
