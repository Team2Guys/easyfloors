import React from 'react';
import CartPage from 'components/cart/cart-page';
import Breadcrumb from 'components/Reusable/breadcrumb';
import RelatedSlider from 'components/related-slider/related-slider';
import { fetchSubCategories } from 'config/fetch';

const Cart = async () => {
  const subCategories = await fetchSubCategories()
  const products = subCategories?.products || [];
  return (
    <>
      <Breadcrumb title="Cart" />
      <CartPage />
      <RelatedSlider products={products.slice(0,5)} CategoryData={subCategories.category} />
    </>
  );
};

export default Cart;
