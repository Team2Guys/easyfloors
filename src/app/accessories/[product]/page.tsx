"use client";
import Container from "components/common/container/Container";
import Breadcrumb from "components/Reusable/breadcrumb";
import Thumbnail from "components/product-detail/thumbnail";
import SkirtingProductDetail from "components/product-detail/productinfo";
import Features from "components/Reusable/features";
import { accessoriesfaqs, accessoriesimages, featureItems, productTabs, ThumnailBottom, ThumnailImage } from "data/data";
import Faqs from "components/Faqs/Faqs";
import ProductDetails from "components/Reusable/additinalinfo";
import RelatedSlider from 'components/related-slider/related-slider';
import { fetchSubCategories } from 'config/fetch';


const ProductImageGallery = async () => {
  const subCategories = await fetchSubCategories();
  console.log("SubCategories Data:", subCategories); // Debugging
  
  const products = subCategories?.products || [];
  console.log("Products Data:", products);
  return (
    <>
    <Container>
    <Breadcrumb />
    <div className="flex flex-col lg:flex-row">
    <div className="w-full lg:w-8/12">
    <Thumbnail ThumnailImage={accessoriesimages} ThumnailBottom={ThumnailBottom} hideThumnailBottom={true} />
    </div>
    <div className="w-full lg:w-4/12">
    <SkirtingProductDetail />
    </div>
    </div>
    <ProductDetails tabs={productTabs} />
    <Faqs data={accessoriesfaqs} className="!py-3" />
    </Container>
    <Features items={featureItems} />
    <RelatedSlider products={products.slice(0,5)} CategoryData={subCategories.category} />
    </>
  );
};

export default ProductImageGallery;
