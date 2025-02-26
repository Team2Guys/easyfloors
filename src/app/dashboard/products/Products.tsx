'use client';

import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import ViewProduct from 'components/Dashboard/Tables/ViewProduct';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import { useEffect, useState } from 'react';
import { ICategory, IProduct } from 'types/type';
import dynamic from 'next/dynamic';
const FormElements = dynamic(() => import('components/Dashboard/FormElements'))

const Product = ({cetagories,productsData}: {
  cetagories: ICategory[];
  productsData: IProduct[];
}) => {
  const [editProduct, setEditProduct] = useState<any | undefined>();
  const [products, setProducts] = useState<any[]>(productsData);
  const [selecteMenu, setselecteMenu] = useState<string>('Add All Products');

  const EditInitialValues: any = {
    name: editProduct?.name,
    description: editProduct?.description,
    price: editProduct?.price,
    spacification: editProduct && editProduct?.spacification,
    discountPrice: editProduct?.discountPrice,
    category: editProduct && editProduct?.category,
    stock: editProduct && editProduct.stock,
    posterImageUrl: editProduct && editProduct.posterImageUrl,
    posterImageAltText: editProduct && editProduct.posterImageAltText,
    hoverImageUrl: editProduct && editProduct.hoverImageUrl,
    hoverImageAltText: editProduct && editProduct.hoverImageAltText,
    imagesUrl: editProduct && editProduct.productImages,
    sections: editProduct && editProduct?.sections,
    additionalInformation: editProduct && editProduct.additionalInformation,
    Images_Alt_Text: editProduct && editProduct?.Images_Alt_Text,
    Meta_Title: editProduct && editProduct?.Meta_Title,
    Meta_Description: editProduct && editProduct?.Meta_Description,
    Canonical_Tag: editProduct && editProduct?.Canonical_Tag,
    Og_title: editProduct && editProduct?.Meta_Title,
    Og_Image: editProduct && editProduct?.Meta_Title,
    OgUrl: editProduct && editProduct?.Meta_Title,
    sale_counter: editProduct && editProduct?.sale_counter,
    colors: (editProduct && editProduct?.colors) || [],
    sizes: (editProduct && editProduct?.sizes) || [],
    filter: (editProduct && editProduct?.filter) || [],
    custom_url: editProduct && editProduct?.custom_url
  };


  useEffect(() => {

    setProducts(productsData)

  }, [productsData])
  

  




  console.log(editProduct, "EditInitialProductValues")

  const productFlag: boolean = selecteMenu === 'Add All Products' ? true : false;

  
  return (
    <DefaultLayout>
      <Breadcrumb pageName={productFlag ? 'Products' : 'Add Products'} />
      {productFlag ? (
        <ViewProduct
          Categories={products}
          setCategory={setProducts}
          setselecteMenu={setselecteMenu}
          setEditProduct={setEditProduct}
          loading={false}
        />
      ) : (
        <FormElements
          setselecteMenu={setselecteMenu}
          EditInitialValues={editProduct}
          setEditProduct={setEditProduct}
          EditProductValue={
            EditInitialValues &&
            (EditInitialValues.name !== undefined ||
              EditInitialValues.category !== undefined)
              ? EditInitialValues
              : undefined
          }
          categoriesList={cetagories}
        />
      )}
    </DefaultLayout>
  );
};

export default ProtectedRoute(Product);
