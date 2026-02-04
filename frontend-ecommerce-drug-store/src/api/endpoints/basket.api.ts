import apiClient from '../apiClient';
import type { AddToBasketRequest } from '../types/basket.types';

export const basketApi = {
  addItem: async (drugId: number, basketId: number): Promise<string> => {
    const data: AddToBasketRequest = { drugId, basketId };
    const response = await apiClient.post<string>('/api/basket/add', data);
    return response.data;
  },
};
