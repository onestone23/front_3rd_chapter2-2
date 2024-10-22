import { useState } from 'react';
import { Product } from '../../types.ts';

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = (product: Product) => {
    const prevProduct = products.find((item) => item.id === product.id);
    if (prevProduct) {
      setProducts((prev) => prev.map((item) => (item.id === product.id ? { ...product } : item)));
    } else {
      addProduct(product);
    }
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
