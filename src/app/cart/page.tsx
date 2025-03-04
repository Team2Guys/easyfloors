import React from 'react';
import CartPage from 'components/cart/cart-page';
import Breadcrumb from 'components/Reusable/breadcrumb';
import RelatedSlider from 'components/related-slider/related-slider';
import { flooringTypes } from 'data/produuct-detail';

const Cart = () => {
  const relatedProducts = flooringTypes.flatMap((flooring) => flooring.product).slice(0, 5);

  return (
    <>
      <Breadcrumb title="Cart" />
      <CartPage />
      <RelatedSlider products={relatedProducts} />
    </>
  );
};

export default Cart;
