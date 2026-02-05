import apiClient from '../apiClient';
import type { Drug, DrugPage, DrugFilters, DrugType, Brand, Category } from '../types/drug.types';

export const drugsApi = {
  getAll: async (filters: DrugFilters = {}): Promise<DrugPage> => {
    const params = {
      page: filters.page ?? 0,
      size: filters.size ?? 12,
      sortBy: filters.sortBy ?? 'id',
      ascending: filters.ascending ?? true,
      typeId: filters.typeId ?? 0,
      brandId: filters.brandId ?? 0,
      categoryId: filters.categoryId ?? 0,
    };
    const response = await apiClient.get<DrugPage>('/api/drug', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Drug> => {
    const response = await apiClient.get<Drug>(`/api/drug/${id}`);
    return response.data;
  },

  getByType: async (typeId: number): Promise<Drug[]> => {
    const response = await apiClient.get<Drug[]>(`/api/drug/type/${typeId}`);
    return response.data;
  },

  getByBrand: async (brandId: number): Promise<Drug[]> => {
    const response = await apiClient.get<Drug[]>(`/api/drug/brand/${brandId}`);
    return response.data;
  },

  getTypes: async (): Promise<DrugType[]> => {
    const response = await apiClient.get<DrugType[]>('/api/type');
    return response.data;
  },

  getBrands: async (): Promise<Brand[]> => {
    const response = await apiClient.get<Brand[]>('/api/brand');
    return response.data;
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/api/category/getAll');
    return response.data;
  },
};
