import AccessoriesComp from 'components/Accessories/Accessories'; 
import Breadcrumb from 'components/Reusable/breadcrumb';
import { fetchAccessories } from 'config/fetch';
import React from 'react';

const Accessories = async () => {
const [ accessories ] = await Promise.all([fetchAccessories()]);
console.log(accessories,"accessories")
  return (
    <>
      <Breadcrumb title="Accessories" image="/assets/images/accessories/Accessories-header-image.png" />
      <AccessoriesComp product={accessories}  /> 
    </>
  );
};

export default Accessories;
