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
  drugInfoDto:DrugInfo[]
 
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
  drugInfoDto:DrugInfo[]
}

export interface UpdateDrugRequest {
  name?: string;
  price?: number;
  stock?: number;
  img?: string;
  typeId?: number;
  brandId?: number;
  drugInfoDto:DrugInfo[]
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

export type CountryOfOrigin = "ENG" | "UKR" | "RUS"

export interface DrugInfo {
  title:string
  manufacturer:""
  lang:CountryOfOrigin
  description_md:string
  sm_description:string
  barcode:string
  sku:string
  dosageForm:string
  volume:string
  activeIngredient:string
  strength:string
  countryOfOrigin:""
  storageCondition: string
  ageRestriction:number
  
}
