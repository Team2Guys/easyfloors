
import Container from "components/common/container/Container";
import Breadcrumb from "components/Reusable/breadcrumb";
import Thumbnail from "components/product-detail/thumbnail";
import SkirtingProductDetail from "components/product-detail/productinfo";
import Features from "components/Reusable/features";
import { accessoriesimages, featureItems,  ThumnailBottom,  } from "data/data";
import RelatedSlider from 'components/related-slider/related-slider';
import { fetchProducts } from 'config/fetch';
import FaqDetail from "components/product-detail/faq-detail";
import AdditionalInfo from "components/product-detail/additional-information";

const ProductImageGallery = async ({params}:{params:Promise<{product:string}>}) => {
  const { product } = await params;
  const productData = await fetchProducts();
  return (
    <>
    <Breadcrumb slug="Accessories" title={product}/>
    <Container>
    <div className="flex flex-col lg:flex-row">
    <div className="w-full lg:w-[60%]">
    <Thumbnail ThumnailImage={accessoriesimages} ThumnailBottom={ThumnailBottom} hideThumnailBottom imageheight />
    </div>
    <div className="w-full lg:w-[40%]">
    <SkirtingProductDetail />
    </div>
    </div>
    <div className="mb-10 max-w-[95%] sm:max-w-[90%] lg:max-w-[80%] mx-auto">
      <AdditionalInfo description={productData[0].description} AdditionalInformation={productData[0].AdditionalInformation} subcategory={productData[0].subcategory?.name || ""} />
      <FaqDetail FAQS={productData[0].FAQS} />
    </div>
  
    </Container>
    <Features items={featureItems} />
    <RelatedSlider products={productData.slice(0,5)} CategoryData={productData.category} subCategoryData={productData.subcategory} />
    </>
  );
};

export default ProductImageGallery;
