export interface Drug {
  id: number;
  name: string;
  price: number;
  stock: number;
  img: string;
  typeId: number;
  brandId: number;
  typeName: string;
  brandName: string;
}

export interface DrugPage {
  content: Drug[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export interface DrugFilters {
  page?: number;
  size?: number;
  sortBy?: string;
  ascending?: boolean;
  typeId?: number;
  brandId?: number;
}

export interface DrugType {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}
