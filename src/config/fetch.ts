import { ICategory, IReview } from 'types/type';
import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all`,
      {
        next: { tags: ['products'] },
      },
    );
    if (!result.ok) {

      return [];
    }
    const response = await result.json();

    return response;
  } catch (error) {
    console.log(error, 'error');
  }
};



export const DashboardfetchProducts = async () => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all`,
      {
        cache: 'no-store',
        next: { tags: ['products'] },
      },
    );
    if (!result.ok) {

      return [];
    }
    const response = await result.json();

    return response;
  } catch (error) {
    console.log(error, 'error');
  }
};
//eslint-disable-next-line
export const fetchCategories = async (): Promise<ICategory[] | any> => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/get-all`,
      {
        next: { tags: ['categories'] },
      },
    );
    const response = await result.json();
    return response;
  } catch (error) {
    console.log(error, 'error');
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



export const get_all_records = async (token: Record<string, string>) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/get_all_records`,
      {
        headers: token
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const record = await response.json();
    return record;
  } catch (err) {
    console.error("Error fetching records:", err);
    return null;
  }
};