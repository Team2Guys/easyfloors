import axios, { AxiosResponse } from 'axios';
import React from 'react';

type setTotalProducts = React.Dispatch<React.SetStateAction<{ id: string; name: string; }[]>>;
type setTotalPage = React.Dispatch<React.SetStateAction<string | undefined>>;
type setError = React.Dispatch<React.SetStateAction<string | null>>;
type setLoading = React.Dispatch<React.SetStateAction<boolean>>;

export const uploadPhotosToBackend = async (files: File[]): Promise<any[]> => { //eslint-disable-line
  const formData = new FormData();

  if (files.length === 0) throw new Error('No files found');

  try {
    for (const file of files) {
      formData.append('image', file);
    }
    //eslint-disable-next-line
    const response: AxiosResponse<any> = await axios.post(
      `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE}/api/file-upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    // Handle the response from the backend
    return response.data?.productsImageUrl;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const ImageRemoveHandler = async (
  imagePublicId: string,
  setterFunction: React.Dispatch<React.SetStateAction<{ public_id: string }[]>>, 
) => {
  // const requestConfig: AxiosRequestConfig = {
  //   data: { imageUrl: imagePublicId },
  // };
  // console.log('function calleddd');
  // console.log('Public ID' + imagePublicId);
  // console.log(imagePublicId);
  // console.log(imagePublicId);
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE}/api/file-upload/DelImage/${imagePublicId}`,
    );
    console.log('Image removed successfully:', response.data);
    setterFunction((prev) =>
      prev.filter((item) => item.public_id != imagePublicId),
    );
  } catch (error) {
    console.error('Failed to remove image:', error);
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
  } catch (err: any) {//eslint-disable-line
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
  setTotalProductscount?: any, //eslint-disable-line
) => {
  try {
    setLoading(true);
    const { products, totalPages, totalProducts } =
      await getPaginatedproducts(pageNumber);
    setTotalProducts(products);
    setTotalPage && setTotalPage(totalPages); //eslint-disable-line
    setTotalProductscount && setTotalProductscount(totalProducts); //eslint-disable-line
  } catch (err: any) { //eslint-disable-line
    console.log(err, 'err');
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
