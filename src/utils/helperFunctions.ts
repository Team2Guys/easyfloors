import axios from 'axios';
import PRODUCTS_TYPES from 'types/type';
import React from 'react';
import { FILE_DELETION_MUTATION } from 'graphql/mutations';
import { ProductImage } from 'types/prod';

type setTotalProducts = React.Dispatch<React.SetStateAction<PRODUCTS_TYPES[]>>;
type setTotalPage = React.Dispatch<React.SetStateAction<string | undefined>>;
type setError = React.Dispatch<React.SetStateAction<string | null>>;
type setLoading = React.Dispatch<React.SetStateAction<boolean>>;

export const ImageRemoveHandler = async (
  imagePublicId: string,
  setterFunction: React.Dispatch<React.SetStateAction<ProductImage[] | undefined>>,
) => {
  try {
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


export const getPaginatedproducts = async (page: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPaginateProducts?page=${page}`,
    );
    const products = response.data.products;
    const totalPages = response.data.totalPages;
    const currentPage = response.data.currentPage;
    const totalProducts = response.data.totalProducts;
    return {
      products,
      totalPages,
      currentPage,
      totalProducts,
    };
    //eslint-disable-next-line
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    } else if (err.message) {
      throw new Error(err.message);
    } else {
      throw new Error('unexpected Error occured');
    }
  }
};

export const getPRODUCTS = async (
  setTotalProducts: setTotalProducts,
  setError: setError,
  setLoading: setLoading,
  pageNumber: number,
  setTotalPage?: setTotalPage,
  //eslint-disable-next-line
  setTotalProductscount?: any,
) => {
  try {
    setLoading(true);
    const { products, totalPages, totalProducts } =
      await getPaginatedproducts(pageNumber);
    setTotalProducts(products);
    //eslint-disable-next-line
    setTotalPage && setTotalPage(totalPages);
    //eslint-disable-next-line
    setTotalProductscount && setTotalProductscount(totalProducts);
    //eslint-disable-next-line
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else if (err.message) {
      setError(err.message);
    } else {
      setError('An unexpected error occurred.');
    }
  } finally {
    setLoading(false);
  }
};
