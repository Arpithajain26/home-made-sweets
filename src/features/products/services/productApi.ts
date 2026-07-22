import apiClient from '../../../services/apiClient';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  allergen?: string;
  imageUrl?: string;
  category?: string;
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
