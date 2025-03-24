import React from 'react';
import CartPage from 'components/cart/cart-page';
import Breadcrumb from 'components/Reusable/breadcrumb';
import { fetchProducts } from 'config/fetch';

const Cart = async () => {
  const products = await fetchProducts()
  return (
    <>
      <Breadcrumb title="Cart" />
      <CartPage products={products}  />
    </>
  );
};

export default Cart;
