import apiClient from '../../apiClient';
import type { DrugType, CreateTypeRequest } from '../../types/drug.types';

export const adminTypesApi = {
  getAll: async (): Promise<DrugType[]> => {
    const response = await apiClient.get('/api/type');
    return response.data;
  },

  getById: async (id: number): Promise<DrugType> => {
    const response = await apiClient.get(`/api/type/${id}`);
    return response.data;
  },

  create: async (data: CreateTypeRequest): Promise<DrugType> => {
    const response = await apiClient.post('/api/type/create', data);
    return response.data;
  },

  update: async (id: number, data: CreateTypeRequest): Promise<DrugType> => {
    const response = await apiClient.put(`/api/type/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/type/${id}`);
  },
};
