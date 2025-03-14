import {IReview } from 'types/type';
import axios from 'axios';
import { FETCH_ALL_CATEGORIES, FETCH_ALL_PRODUCTS, FETCH_ALL_SUB_CATEGORIES, GET_ALL_ADMINS,} from 'graphql/queries';
import client from './apolloClient';
import { DocumentNode} from '@apollo/client';
import { FETCH_ALL_ACCESSORIES } from 'graphql/Accessories';


export const fetchProducts = async () => {
  try {
    const { data } = await client.query({
      query: FETCH_ALL_PRODUCTS,
       fetchPolicy: "no-cache",
      context: {
        fetchOptions: {
          credentials: "include",
          next: { tags: ["products"] }
        },
      },
    });

    return data?.products || [];
  } catch (error) {
    return []
    throw error;
  }
};

export const fetchCategories = async (FETCH_HEADER_CATEGORIES?:DocumentNode) => {
  try {
    const { data } = await client.query({
      query: FETCH_HEADER_CATEGORIES ? FETCH_HEADER_CATEGORIES : FETCH_ALL_CATEGORIES,
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["categories"] } }, 
      },

    });

    return data?.categories || [];
  } catch (error) {
    return []
    throw error;
  }
};

export const fetchSubCategories = async (FETCHSUBCAT?:DocumentNode) => {
  try {
    const { data } = await client.query({
      query: FETCHSUBCAT ?FETCHSUBCAT : FETCH_ALL_SUB_CATEGORIES,
   fetchPolicy: "no-cache",
   context: {
    fetchOptions: { next: { tags: ["subcategories"] } }, 
  },
    })

    return data?.subCategories || []
  } catch (error) {
    return []
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


export const get_allAdmins = async (token: string | undefined) => {
  try {
    if (!token) throw new Error("Auntheticatoin token not found")
    const { data } = await client.query({
      query: GET_ALL_ADMINS,
      context: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    })
    return data?.admins || []
  } catch (error) {
    throw error;
  }

}



export const fetchAccessories = async (CUSTOMISE_ACCESSORIES?:DocumentNode) => {
  try {
    const { data } = await client.query({
      query: CUSTOMISE_ACCESSORIES ? CUSTOMISE_ACCESSORIES : FETCH_ALL_ACCESSORIES,
       fetchPolicy: "no-cache",
      context: {
        fetchOptions: {
          credentials: "include",
          next: { tags: ["accessories"] }
        },
      },
    });

    return data?.products || [];
  } catch (error) {
    return []
    throw error;
  }
};
