import RelatedSlider from 'components/related-slider/related-slider';
import Breadcrumb from 'components/Reusable/breadcrumb';
import ThankYouComp from 'components/ThankYou/ThankYou';
import { fetchProducts } from 'config/fetch';
import React from 'react';

const ThankYou = async () => { 
  const productData = await fetchProducts();

  return (
    <>
      <Breadcrumb title="Thank You" />
      <ThankYouComp />
      <RelatedSlider 
        products={productData.slice(0, 5)} 
        CategoryData={productData.category} 
        subCategoryData={productData.subcategory} 
      />
    </>
  );
};

export default ThankYou;
