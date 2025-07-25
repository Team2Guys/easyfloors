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
import ProductContainer from 'components/ProdutDetailContainer/ProductContainer';

const ProductDetail = ({ MainCategory, subCategory, ProductName, productData , AccessoriesProducts }: detailprops) => {
  return (
    <div className="mb-10">
      <Breadcrumb title={ProductName} slug={MainCategory} subcategory={subCategory} />

          <ProductContainer
            MainCategory={MainCategory}
            subCategory={subCategory}
            ProductName={ProductName}
            productData={productData}
          />


      <div className="lg:max-w-[80%] max-w-[95%] mb-10 mx-auto sm:max-w-[90%]">
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
      <RelatedSlider products={(AccessoriesProducts) || []} />
    </div>
  );
};

export default ProductDetail;
