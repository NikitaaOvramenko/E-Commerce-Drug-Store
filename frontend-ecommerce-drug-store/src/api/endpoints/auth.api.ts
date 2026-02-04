import apiClient from '../apiClient';
import type { LoginRequest, RegisterRequest, LoginResponse, User } from '../types/auth.types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<User> => {
    const response = await apiClient.post<User>('/auth/register', data);
    return response.data;
  },

  sendVerification: async (email: string): Promise<string> => {
    const response = await apiClient.post<string>('/api/send_verify', { to: email });
    return response.data;
  },

  verifyEmail: async (uuid: string): Promise<string> => {
    const response = await apiClient.get<string>(`/api/verify/${uuid}`);
    return response.data;
  },
};
