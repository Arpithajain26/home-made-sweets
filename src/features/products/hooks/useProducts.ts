import { useState, useEffect } from 'react';
import { fetchProducts, type Product } from '../services/productApi';
import { SWEETS_CATALOG } from '../../../data/catalog';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchProducts()
      .then((data) => {
        if (!cancelled) {
          // Filter out "Banana Chips" from backend data
          const filtered = data.filter(
            (p) => !p.nameEn.toLowerCase().includes('banana chip')
          );
          setProducts(filtered.length > 0 ? filtered : SWEETS_CATALOG as unknown as Product[]);
        }
      })
      .catch(() => {
        // Fallback to local catalog when API fails
        if (!cancelled) setProducts(SWEETS_CATALOG as unknown as Product[]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tick]);

  return { products, loading, error, refetch: () => setTick((t) => t + 1) };
};
