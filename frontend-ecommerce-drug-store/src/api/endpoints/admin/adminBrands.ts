import apiClient from '../../apiClient';
import type { Brand, CreateBrandRequest } from '../../types/drug.types';

export const adminBrandsApi = {
  getAll: async (): Promise<Brand[]> => {
    const response = await apiClient.get('/api/brand');
    return response.data;
  },

  getById: async (id: number): Promise<Brand> => {
    const response = await apiClient.get(`/api/brand/${id}`);
    return response.data;
  },

  create: async (data: CreateBrandRequest): Promise<Brand> => {
    const response = await apiClient.post('/api/brand/create', data);
    return response.data;
  },

  update: async (id: number, data: CreateBrandRequest): Promise<Brand> => {
    const response = await apiClient.put(`/api/brand/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/brand/${id}`);
  },
};
