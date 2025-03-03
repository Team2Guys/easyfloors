"use client";

import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "components/Dashboard/DefaultLayout";
import ViewProduct from "components/Dashboard/dashboard_products/ViewProduct";
import ProtectedRoute from "hooks/AuthHookAdmin";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { IProduct } from "types/prod";
import { DASHBOARD_MAINPAGE_PROPS } from "types/PagesProps";
const AddProd = dynamic(
  () => import("components/Dashboard/dashboard_products/AddProd")
);

const Product = ({ categories, productsData }: DASHBOARD_MAINPAGE_PROPS) => {
  const [editProduct, setEditProduct] = useState<IProduct | undefined>();
  const [products, setProducts] = useState<IProduct[]>(productsData);
  const [selecteMenu, setselecteMenu] = useState<string>("Add All Products");

  const EditInitialValues = {
    name: editProduct?.name || "",
    description: editProduct?.description || "",
    price: editProduct?.price || 0,
    spacification: editProduct && editProduct?.spacification,
    discountPrice: editProduct?.discountPrice,
    category: editProduct && editProduct?.category?.id,
    subCategory: editProduct && editProduct?.subCategory?.id,
    stock: (editProduct && editProduct.stock) || 0,
    posterImageUrl: editProduct?.posterImageUrl || {},
    productImages: (editProduct && editProduct.productImages) || [],
    AdditionalInformation:
      (editProduct && editProduct.AdditionalInformation) || [],
    Meta_Title: (editProduct && editProduct?.Meta_Title) || "",
    Meta_Description: (editProduct && editProduct?.Meta_Description) || "",
    Canonical_Tag: (editProduct && editProduct?.Canonical_Tag) || "",
    colors: (editProduct && editProduct?.colors) || [],
    custom_url: editProduct && editProduct?.custom_url,
  };


  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);
  const productFlag: boolean =
    selecteMenu === "Add All Products" ? true : false;

  return (
    <DefaultLayout>
      <Breadcrumb pageName={productFlag ? "Products" : "Add Products"} />
      {productFlag ? (
        <ViewProduct
          products={products}
          setProducts={setProducts}
          setselecteMenu={setselecteMenu}
          setEditProduct={setEditProduct}
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
          categoriesList={categories}
        />
      )}
    </DefaultLayout>
  );
};

export default ProtectedRoute(Product);
