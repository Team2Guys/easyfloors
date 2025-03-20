"use client";
import Container from 'components/common/container/Container';
import AdditionalInfo from 'components/product-detail/additional-information';
import FaqDetail from 'components/product-detail/faq-detail';
import Features from 'components/Reusable/features';
import Breadcrumb from 'components/Reusable/breadcrumb';
import RelatedSlider from 'components/related-slider/related-slider';
import { featureItems } from 'data/data';
import React from 'react';
import { detailprops } from 'types/product-detail';
import ProductContainer from 'components/ProdutDetailContainer.tsx/ProductContainer';

const ProductDetail = ({ MainCategory, subCategory, ProductName, ProductInfo, productData }: detailprops) => {
  return (
    <div className="mb-10">
      <Breadcrumb title={ProductName} slug={MainCategory} subcategory={subCategory} />
      <ProductContainer 
        // accessories={productData?.acessories || []} 
        MainCategory={MainCategory} 
        subCategory={subCategory} 
        ProductName={ProductName} 
        productData={productData} 
        ProductInfo={ProductInfo}  
      />

      <div className="mb-10 max-w-[95%] sm:max-w-[90%] lg:max-w-[80%] mx-auto">
        <AdditionalInfo 
          description={productData?.description || ''} 
          AdditionalInformation={productData?.AdditionalInformation} 
          subcategory={productData?.subcategory?.name || ""} 
        />
        <FaqDetail FAQS={productData?.FAQS} />
      </div>

      <Container>
        <Features items={featureItems} />
      </Container>
      <RelatedSlider 
        products={ProductInfo.slice(0, 5)} 
        CategoryData={productData?.category} 
        subCategoryData={productData?.subcategory} 
      />
    </div>
  );
};

export default ProductDetail;
