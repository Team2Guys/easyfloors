import { IReview } from 'types/type';
import axios from 'axios';
import { FETCH_ALL_APPOINTMENTS, FETCH_ALL_CATEGORIES, FETCH_ALL_PRODUCTS, FETCH_ALL_SUB_CATEGORIES, FIND_ONE_CATEGORY, FIND_ONE_PRODUCT, FIND_ONE_SUB_CATEGORY, GET_ALL_ADMINS, } from 'graphql/queries';
import client from './apolloClient';
import { DocumentNode } from '@apollo/client';
import { FETCH_ALL_ACCESSORIES } from 'graphql/Accessories';
import { Category } from 'types/cat';
import { IProduct } from 'types/prod';


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

export const fetchCategories = async (FETCH_HEADER_CATEGORIES?: DocumentNode) => {
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

export const fetchSubCategories = async (FETCHSUBCAT?: DocumentNode) => {
  try {
    const { data } = await client.query({
      query: FETCHSUBCAT ? FETCHSUBCAT : FETCH_ALL_SUB_CATEGORIES,
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

export const fetchAppointments = async (token: string | undefined) => {
  try {
    const { data } = await client.query({
      query: FETCH_ALL_APPOINTMENTS,
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${token}`
        },
        fetchOptions: { 
          next: { tags: ["appointments"] }
        },
      },
    });
    return data?.appointments || [];
  } catch (error) {
    return []
    throw error;
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
    return error;
  }

}



export const fetchAccessories = async (CUSTOMISE_ACCESSORIES?: DocumentNode) => {
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

    return data?.accessories || [];
  } catch (error) {
    return []
    throw error;
  }
};



export const fetchSingleCategory = async (customUrl: string, FIND_ONE_CUSTOM_QUERY?: DocumentNode, accessoryFlag?: boolean): Promise<Category | null> => {
  try {
    const { data } = await client.query({
      query: FIND_ONE_CUSTOM_QUERY ? FIND_ONE_CUSTOM_QUERY : FIND_ONE_CATEGORY,
      variables: { customUrl, accessoryFlag },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["categories"] } },
      },

    });
    return data?.category;
  } catch (error) {
    return null;
    throw error;
  }
};

export const fetchSingeSubCategory = async (customUrl: string): Promise<Category | null> => {
  try {
    const { data } = await client.query({
      query: FIND_ONE_SUB_CATEGORY,
      variables: { customUrl },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["categories"] } },
      },

    });
    return data?.subCategory;
  } catch (error) {
    return null;
    throw error;
  }
};

export const fetchSingeProduct = async (customUrl: string, category: string, subCategory: string): Promise<IProduct | null> => {
  try {
    const { data } = await client.query({
      query: FIND_ONE_PRODUCT,
      variables: { custom_url: customUrl, category, subCategory },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["products"] } },
      },

    });
    return data?.product;
  } catch (error) {
    return null;
    throw error;
  }
};
