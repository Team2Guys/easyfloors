import AccessoriesComp from 'components/Accessories/Accessories'; 
import Breadcrumb from 'components/Reusable/breadcrumb';
import { product } from 'data/data';
import React from 'react';

const Accessories = () => {
  return (
    <>
      <Breadcrumb title="Accessories" image="/assets/images/accessories/Accessories-header-image.png" />
      <AccessoriesComp product={product} features={[]} />
    </>
  );
};

export default Accessories;
