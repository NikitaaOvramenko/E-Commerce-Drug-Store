import apiClient from "../apiClient";
import type { AddToBasketRequest, BasketDrugDto } from "../types/basket.types";

export const basketApi = {
  // Get all items in the basket
  getBasket: async (basketId: number): Promise<BasketDrugDto[]> => {
    const response = await apiClient.get<BasketDrugDto[]>(
      `/api/basket/${basketId}`
    );
    return response.data;
  },

  // Add item to basket
  addItem: async (drugId: number, basketId: number): Promise<string> => {
    const data: AddToBasketRequest = { drugId, basketId };
    const response = await apiClient.post<string>("/api/basket/add", data);
    console.log("added to basket !")
    return response.data;
  },

  // Remove item from basket
  removeItem: async (basketId: number, drugId: number): Promise<string> => {
    const response = await apiClient.delete<string>(
      `/api/basket/${basketId}/item/${drugId}`
    );
    return response.data;
  },

  // Update item quantity
  updateQuantity: async (
    basketId: number,
    drugId: number,
    quantity: number
  ): Promise<string> => {
    const response = await apiClient.put<string>(
      `/api/basket/${basketId}/item/${drugId}`,
      { quantity }
    );
    return response.data;
  },

  // Clear all items from basket
  clearBasket: async (basketId: number): Promise<string> => {
    const response = await apiClient.delete<string>(
      `/api/basket/${basketId}/clear`
    );
    return response.data;
  },
};
