import { CartItem, Product } from '../../../types';
import { ProductItem } from './ProductItem';

interface Props {
  cart: CartItem[];
  products: Product[];
  addToCart: (product: Product) => void;
}

export const ProductList = ({ cart, products, addToCart }: Props) => {
  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>상품 목록</h2>
      <div className='space-y-2'>
        {products.map((product) => (
          <ProductItem product={product} remainingStock={getRemainingStock(product)} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};
