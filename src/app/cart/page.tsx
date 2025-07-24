import React from 'react';
import CartPage from 'components/cart/cart-page';
import Breadcrumb from 'components/Reusable/breadcrumb';
import { fetchProducts } from 'config/fetch';
import { createMetadata } from 'utils/metadataHelper';
import { pageMetadataData } from 'data/meta-data';
export const metadata = createMetadata(pageMetadataData.cart);
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
