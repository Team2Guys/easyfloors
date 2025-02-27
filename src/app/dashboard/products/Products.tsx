'use client';
   

import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import ViewProduct from 'components/Dashboard/Tables/ViewProduct';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import {useState } from 'react';
import { ICategory} from 'types/type';
import dynamic from 'next/dynamic';
import { fetchProducts } from 'config/fetch';
import { IProduct } from 'types/prod';
const AddProd = dynamic(() => import('components/Dashboard/AddProds/AddProd'))

const Product = ({cetagories,productsData}: {cetagories: ICategory[];productsData: IProduct[]}) => {
  const [editProduct, setEditProduct] = useState<IProduct | undefined>();
  const [products, setProducts] = useState<IProduct[]>(productsData);
  const [selecteMenu, setselecteMenu] = useState<string>('Add All Products');

  /* eslint-disable */

  const EditInitialValues: IProduct | any = {
    name: editProduct?.name || "",
    description: editProduct?.description || "",
    price: editProduct?.price || 0,
    spacification: editProduct && editProduct?.spacification,
    discountPrice: editProduct?.discountPrice,
    category: editProduct && editProduct?.category,
    stock: editProduct && editProduct.stock || 0 ,
    posterImageUrl: editProduct && editProduct.posterImageUrl || "",
    productImages: editProduct && editProduct.productImages || [],
    sections: editProduct && editProduct?.sections,
    additionalInformation: editProduct && editProduct.additionalInformation || [],
    Meta_Title: editProduct && editProduct?.Meta_Title || "",
    Meta_Description: editProduct && editProduct?.Meta_Description || "",
    Canonical_Tag: editProduct && editProduct?.Canonical_Tag || "",
    sale_counter: editProduct && editProduct?.sale_counter,
    colors: (editProduct && editProduct?.colors) || [],
    sizes: (editProduct && editProduct?.sizes) || [],
    filter: (editProduct && editProduct?.filter) || [],
    custom_url: editProduct && editProduct?.custom_url
  };


  // useEffect(() => {

  //   setProducts(productsData)

  // }, [productsData])
  

  




  console.log(editProduct, "EditInitialProductValues")

  const productFlag: boolean = selecteMenu === 'Add aaAll Products' ? true : false;

  
  return (


    <DefaultLayout>
      <button onClick={fetchProducts}>fetchProducts</button>
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
        <AddProd
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
   
   
  /* eslint-enable */