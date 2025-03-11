

import axios from 'axios';
import React from 'react';
import { FILE_DELETION_MUTATION } from 'graphql/mutations';
import { IProduct, ProductImage } from 'types/prod';
// import { toast } from 'react-toastify';

export const ImageRemoveHandler = async (
  imagePublicId: string,
  setterFunction: React.Dispatch<React.SetStateAction<ProductImage[] | undefined>>,
  finalToken?:string
) => {
  try {
    // if(!finalToken) return  toast.success("Token Not found ")
    const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL || "",
      {
        query: FILE_DELETION_MUTATION,
        variables: {
          public_id: imagePublicId,
        },  
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${finalToken}`,
        },
        withCredentials: true,
      }
    );
    

    
    if (response.data.data?.DeleteImage) {
      setterFunction((prev) =>prev?.filter((item) => item.public_id !== imagePublicId));
    }
  } catch (error) {
throw error;
 }
};


export const handleImageAltText = (
  index: number,
  newImageIndex: string,
  setImagesUrlhandler: React.Dispatch<React.SetStateAction<ProductImage[] | undefined>>,
) => {
  setImagesUrlhandler((prev: ProductImage[] | undefined) => {
    if (!prev) return [];

    const updatedImagesUrl = prev?.map((item: ProductImage, i: number) => i === index ? { ...item, altText: newImageIndex } : item);
    return updatedImagesUrl;
  });
};


export const TrimerHandler = (value:string)=>{
  if(!value) return 

return value.trim().toLowerCase()



}


export const ProductsSorting = (filtered: IProduct[], sortOption: string) => {
  switch (sortOption) {
    case "A to Z":
      filtered = filtered?.sort((a, b) => {
        if (!a.name || !b.name) return 0;
        return a.name.localeCompare(b.name);
      });
      break;

    case "Z to A":

      filtered = filtered?.sort((a, b) => {
        if (!a.name || !b.name) return 0;
        return b.name.localeCompare(a.name);
      });
      break;

    case "Low to High":
      filtered = filtered?.sort((a:IProduct, b) => {
        const priceA = a.price
        const priceB = b.price

        return priceA - priceB;
      });
      break;

    case "High to Low":
      filtered = filtered?.sort((a, b) => {
        const priceA = a.price
        const priceB = b.price


        return priceB - priceA;
      });
      break;

    default:
      break;
  }
}





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
