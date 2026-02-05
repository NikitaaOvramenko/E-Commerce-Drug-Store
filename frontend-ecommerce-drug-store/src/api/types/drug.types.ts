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
  categoryId?: number;
}

export interface DrugType {
  id: number;
  name: string;
  brandIds?: number[];
  brandNames?: string[];
}

export interface Brand {
  id: number;
  name: string;
  typeIds?: number[];
  typeNames?: string[];
}

export interface Category {
  id: number;
  name: string;
}

// Admin DTOs for creating/updating
export interface CreateDrugRequest {
  name: string;
  price: number;
  stock: number;
  img: string;
  typeId: number;
  brandId: number;
}

export interface UpdateDrugRequest {
  name?: string;
  price?: number;
  stock?: number;
  img?: string;
  typeId?: number;
  brandId?: number;
}

export interface CreateTypeRequest {
  name: string;
  brandIds: number[];
}

export interface CreateBrandRequest {
  name: string;
  typeIds: number[];
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UrlResponse {
  url:string
}
