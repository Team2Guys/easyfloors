

import axios from 'axios';
import React from 'react';
import { FILE_DELETION_MUTATION } from 'graphql/mutations';
import { ProductImage } from 'types/prod';
import showToast from 'components/Toaster/Toaster';

export const ImageRemoveHandler = async (
  imagePublicId: string,
  setterFunction: React.Dispatch<React.SetStateAction<ProductImage[] | undefined>>,
  finalToken?:string
) => {
  try {
    if(!finalToken) return  showToast("error", "Token Not found ")
    const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL || "",
      {
        query: FILE_DELETION_MUTATION,
        variables: {
          public_id: imagePublicId,
        },
        context: {
          headers: {
            Authorization: `Bearer ${finalToken}`,
          },
        },
        
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    
    if (response.data.data?.DeleteImage) {
      setterFunction((prev) =>prev?.filter((item) => item.public_id !== imagePublicId));
    }
  } catch (error) {
throw error;
 }
};


// export const getPRODUCTS = async (
//   setTotalProducts: setTotalProducts,
//   setError: setError,
//   setLoading: setLoading,
//   pageNumber: number,
//   setTotalPage?: setTotalPage,
   
//   setTotalProductscount?: any,
// ) => {
//   // try {
//   //   setLoading(true);
//   //   const { products, totalPages, totalProducts } =
//   //     await getPaginatedproducts(pageNumber);
//   //   setTotalProducts(products);
     
//   //   setTotalPage && setTotalPage(totalPages);
     
//   //   setTotalProductscount && setTotalProductscount(totalProducts);
     
//   // } catch (err: any) {
//   //   if (err.response && err.response.data && err.response.data.message) {
//   //     setError(err.response.data.message);
//   //   } else if (err.message) {
//   //     setError(err.message);
//   //   } else {
//   //     setError('An unexpected error occurred.');
//   //   }
//   // } finally {
//   //   setLoading(false);
//   // }
// };
