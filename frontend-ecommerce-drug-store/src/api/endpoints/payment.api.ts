import apiClient from '../apiClient';

export interface CreateInvoiceRequest {
  items: Array<{
    drugId: number;
    quantity: number;
    price: number;
  }>;
  total: number;
}

export interface CreateInvoiceResponse {
  invoiceUrl: string;
}

export const paymentApi = {
  createInvoice: async (data: CreateInvoiceRequest): Promise<CreateInvoiceResponse> => {
    const response = await apiClient.post<CreateInvoiceResponse>('/api/payment/create-invoice', data);
    return response.data;
  },
};
