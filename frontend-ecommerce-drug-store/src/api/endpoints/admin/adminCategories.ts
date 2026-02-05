import apiClient from '../../apiClient';
import type { Category, CreateCategoryRequest } from '../../types/drug.types';

export const adminCategoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get('/api/category/getAll');
    return response.data;
  },

  getById: async (id: number): Promise<Category> => {
    const response = await apiClient.get(`/api/category/${id}`);
    return response.data;
  },

  create: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await apiClient.post('/api/category/create', data);
    return response.data;
  },

  update: async (id: number, data: CreateCategoryRequest): Promise<Category> => {
    const response = await apiClient.put(`/api/category/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/category/${id}`);
  },
};
