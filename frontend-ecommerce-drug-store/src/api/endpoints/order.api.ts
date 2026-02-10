import apiClient from "../apiClient";
import type { orderDto } from "../types/order.types";

export const orderApi = {
    checkout: async():Promise<orderDto> => {
        const response = await apiClient.post<orderDto>('/api/order/checkout');
        return response.data
    },
    placeOrder: async(orderId: number):Promise<orderDto> => {
        const response = await apiClient.post<orderDto>(`/api/order/${orderId}/place`);
        return response.data
    },

    getAllDrugs: async():Promise<orderDto[]> => {
        const response = await apiClient.get<orderDto[]>('/api/order/all');
        return response.data
    }
}