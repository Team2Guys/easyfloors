import { ICategory, IReview } from 'types/type';
import axios from 'axios';
import { FETCH_ALL_CATEGORIES, FETCH_ALL_PRODUCTS, FETCH_ALL_SUB_CATEGORIES } from 'graphql/queries';
import client from './apolloClient';


export const fetchProducts = async () => {
  try {
    const { data } = await client.query({
      query: FETCH_ALL_PRODUCTS,
    });

    return data?.products || [];
  } catch (error) {
    throw error;
  }
};



export const fetchCategories = async () => {
  try {
    const { data } = await client.query({
      query: FETCH_ALL_CATEGORIES,
    });
    
    return data?.categories || [];
  } catch (error) {
    return error;
  }
};

export const fetchSubCategories = async (): Promise<ICategory[]> => {
  try {
    const { data } = await client.query({
      query: FETCH_ALL_SUB_CATEGORIES
    })
    return data?.subCategories || []
  } catch (error) {
    throw error
  }
};

export const fetchReviews = async (): Promise<IReview[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/get-all`,
  );
  return response.data;
};

export const TrimUrlHandler = (name: string | undefined) => {
  if (!name) return '';

  return name.trim().toLowerCase();
};



export const get_all_records = async (token: string) => {
  return [token]
  // try {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/get_all_records`,
  //     {
  //       headers: token
  //     }
  //   );

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }

  //   const record = await response.json();
  //   return record;
  // } catch (err) {
  //   console.error("Error fetching records:", err);
  //   return null;
  // }
};