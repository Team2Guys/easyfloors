import { ICategory, IReview } from 'types/type';
import axios from 'axios';
import { FETCH_ALL_CATEGORIES, FETCH_ALL_PRODUCTS } from 'graphql/queries/queries';


export const fetchProducts = async () => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({query: FETCH_ALL_PRODUCTS }),
    });

    if (!result.ok) {
      return [];
    }

    const response = await result.json();

    return response?.data?.products || [];
  } catch (error) {

    return [];
    throw error;
  }
};



export const fetchCategories = async () => {
  try {
    const result = await fetch(process.env.NEXT_PUBLIC_BASE_URL || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({query: FETCH_ALL_CATEGORIES }),
    });

    if (!result.ok) {
      return [];
    }

    const response = await result.json();

    return response?.data?.categories || [];
  } catch (error) {

    return [];
    throw error;
  }
};

export const fetchSubCategories = async (): Promise<ICategory[]> => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/subcategories/get-all`,
    {
      next: { tags: ['subcategories'] },
    },
  );
  const response = await result.json();
  return response;
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