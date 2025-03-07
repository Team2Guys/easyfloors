import Container from "components/common/container/Container";
import Breadcrumb from "components/Reusable/breadcrumb";
import Filters from "components/sub-category/filters";
import SubCategory from "components/sub-category/sub-category-product";
import {fetchProducts } from "config/fetch";
import React from "react";

const Category = async () => {
  const [products] = await Promise.all([

    fetchProducts(),
    
  ]);

  return (
    <>
      <Breadcrumb image="/assets/images/category/category-breadcrumb.png" />
      <Container className="flex flex-wrap lg:flex-nowrap lg:gap-4 xl:gap-8 mt-4 lg:mt-10">
        <div className=" lg:w-[20%] ">
          <Filters className="hidden lg:block" />
        </div>
        <div className="lg:w-[80%]">
          <SubCategory  product={products}/>
        </div>
      </Container>
    </>
  );
};

export default Category;
