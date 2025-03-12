import AccessoriesComp from 'components/Accessories/Accessories'; 
import Breadcrumb from 'components/Reusable/breadcrumb';
import { fetchProducts } from 'config/fetch';
import React from 'react';

const Accessories = async () => {
const [ products ] = await Promise.all([ fetchProducts()]);
  return (
    <>
      <Breadcrumb title="Accessories" image="/assets/images/accessories/Accessories-header-image.png" />
      <AccessoriesComp product={products}  /> 
    </>
  );
};

export default Accessories;
