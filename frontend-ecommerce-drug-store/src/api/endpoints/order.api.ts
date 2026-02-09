import apiClient from "../apiClient";
import type { orderDto } from "../types/order.types";

export const orderApi = {
    checkout: async():Promise<orderDto> => {
        const response = await apiClient.post<orderDto>('/api/order/checkout');
        return response.data
    }
}