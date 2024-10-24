import { CartItem, Coupon, Product } from '../../../types';

export const addToCoupon = (coupons: Coupon[], coupon: Coupon): Coupon[] => {
  return [...coupons, coupon];
};

export const addToCartItem = (cart: CartItem[], product: Product) => {
  const findItem = cart.find((item) => item.product.id === product.id);
  if (findItem) {
    return cart.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
  } else {
    return [...cart, { product: product, quantity: 1 }];
  }
};

export const removeCartItem = (cart: CartItem[], productId: string): CartItem[] => {
  return cart.filter((item) => item.product.id !== productId);
};

export const calculateItemTotal = (item: CartItem) => {
  return (item.product.price - item.product.price * getMaxApplicableDiscount(item)) * item.quantity;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  return item.product.discounts.reduce(
    (prev, cur) => (item.quantity >= cur.quantity ? Math.max(prev, cur.rate) : prev),
    0
  );
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  const totalBeforeDiscount = cart.reduce((prev, cur) => cur.product.price * cur.quantity + prev, 0);
  let totalAfterDiscount = cart.reduce((prev, cur) => prev + calculateItemTotal(cur), 0);
  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      totalAfterDiscount -= selectedCoupon.discountValue;
    } else {
      totalAfterDiscount -= totalAfterDiscount * (selectedCoupon.discountValue / 100);
    }
    totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  }

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id === productId) {
        if (newQuantity === 0) {
          return;
        }
        return { ...item, quantity: Math.min(newQuantity, item.product.stock) };
      }
      return item;
    })
    .filter((item) => !!item);
};
