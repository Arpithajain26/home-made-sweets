import apiClient from '../../../services/apiClient';

export interface Product {
  id: string;
  emoji?: string;
  category: string;
  nameKn: string;
  nameEn: string;
  labelEn: string;
  price: number;
  allergen?: string;
  allergenKn?: string;
  desc: string;
  descKn: string;
  badge?: string;
  rating?: number;
  reviewsCount?: number;
  imageUrl?: string;
}

/** Fetch all available products */
export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get<Product[]>('/products');
  return data;
};

/** Fetch a single product by ID */
export const fetchProductById = async (id: string): Promise<Product> => {
  const { data } = await apiClient.get<Product>(`/products/${id}`);
  return data;
};
