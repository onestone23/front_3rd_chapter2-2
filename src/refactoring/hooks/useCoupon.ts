import { Coupon } from '../../types.ts';
import { useState } from 'react';
import { addToCoupon } from './utils/cartUtils.ts';

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => addToCoupon(prev, coupon));
  };

  return { coupons, addCoupon };
};
