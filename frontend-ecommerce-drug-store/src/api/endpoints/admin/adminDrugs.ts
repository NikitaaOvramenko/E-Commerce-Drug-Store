import apiClient from '../../apiClient';
import type { Drug, CreateDrugRequest, UpdateDrugRequest, UrlResponse } from '../../types/drug.types';

export const adminDrugsApi = {
  create: async (data: CreateDrugRequest): Promise<Drug> => {
    const response = await apiClient.post('/api/drug/create', data);
    return response.data;
  },

  update: async (id: number, data: UpdateDrugRequest): Promise<Drug> => {
    const response = await apiClient.put(`/api/drug/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/drug/${id}`);
  },

  getPresignedUrl: async (fileName: string): Promise<string> => {
    const response = await apiClient.get<UrlResponse>(`/api/upload/${fileName}`);
    return response.data.url;
  }
};
