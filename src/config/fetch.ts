import { FETCH_ALL_APPOINTMENTS, FETCH_ALL_CATEGORIES, FETCH_ALL_ORDERS, FETCH_ALL_PRODUCTS, FETCH_ALL_SUB_CATEGORIES, FIND_ONE_CATEGORY, FIND_ONE_PRODUCT, FIND_ONE_SUB_CATEGORY, GET_ALL_ADMINS, GET_ALL_RECORDS, GET_ORDER_HISTORY, } from 'graphql/queries';
import client from './apolloClient';
import { DocumentNode } from '@apollo/client';
import { FETCH_ALL_ACCESSORIES, FETCH_META_TITLE } from 'graphql/Accessories';
import { Category } from 'types/cat';
import { IProduct } from 'types/prod';
import { FIND_ADMIN_MUTATION, ORDER_QUERY } from 'graphql/mutations';


export const fetchProducts = async (CUSTOMIZE_QUERY?: DocumentNode) => {
  try {
    const { data } = await client.query({
      query: CUSTOMIZE_QUERY ? CUSTOMIZE_QUERY : FETCH_ALL_PRODUCTS,
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


export const fetchOrders = async (token: string | undefined, FETCH_ORDERS?: DocumentNode) => {
  try {
    const { data } = await client.query({
      query: FETCH_ORDERS ? FETCH_ORDERS : FETCH_ALL_ORDERS,
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${token}`
        },
        fetchOptions: {
          next: { tags: ["orders"] }
        },
      },
    });
    return data?.AllOrders || [];
  } catch (error) {
    // return []
    throw error;
  }
};

export const fetchOrdersHistory = async (token: string | undefined, email: string | null | undefined) => {
  try {
    const { data } = await client.query({
      query: GET_ORDER_HISTORY,
      variables: { email },
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${token}`
        },
        fetchOptions: {
          next: { tags: ["usersorders"] }
        },
      },
    });
    return data?.usersOrders || [];
  } catch (error) {
    return []
    throw error;
  }
};

export const get_all_records = async (token: string) => {
  try {
    const { data } = await client.query({
      query: GET_ALL_RECORDS,
      fetchPolicy: "no-cache",
      context: {
        headers: {
          Authorization: `Bearer ${token}`
        },
        fetchOptions: {
          next: { tags: ["states_records"] }
        },
      },
    });
    return data?.GET_ALL_RECORDS;
  } catch (error) {
    return []
    throw error;
  }

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

export const get_Admin = async (token: string | undefined) => {
  try {

    const { data } = await client.query({
      query: FIND_ADMIN_MUTATION,
      context: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    })
    return data?.admin || []
  } catch (error) {
    console.log(error, "error in get_Admin")
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

export const fetchSingeSubCategory = async (customUrl: string, category: string): Promise<Category | null> => {
  try {
    const { data } = await client.query({
      query: FIND_ONE_SUB_CATEGORY,
      variables: { customUrl, category },
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

export const fetchSingeProduct = async (customUrl: string, category: string, subCategory: string, acessories?: boolean, FIND_QUICK_VIEW_PRODUCT?: DocumentNode): Promise<IProduct | null> => {
  try {
    const { data } = await client.query({
      query: FIND_QUICK_VIEW_PRODUCT ? FIND_QUICK_VIEW_PRODUCT : FIND_ONE_PRODUCT,
      variables: { custom_url: customUrl, category, subCategory, acessories },
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


export const fetchSingleOrder = async (orderId: string) => {
  try {
    const { data } = await client.query({
      query: ORDER_QUERY,
      variables: { orderId },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["orders"] } },
      },
    });

    return data?.Order || null;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};



export const getMetaTitleData = async (custom_url: string, category: string) => {
  try {
    const { data } = await client.query({
      query: FETCH_META_TITLE,
      variables: {
        custom_url,
        category,
      },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: {
          credentials: "include",
          next: { tags: ["accessories"] }
        },
      },
    });
    return data?.fetchMetatTitle;

  } catch (error: any) { //eslint-disable-line
    // Log complete error structure

    // Extract useful error details
    if (error?.graphQLErrors?.length) {
      console.error("GraphQL Error:", error.graphQLErrors[0].message);
    } else if (error?.networkError?.result?.errors?.length) {
      console.error("Network Error:", error.networkError.result.errors[0].message);
    } else {
      console.error("Unknown Apollo error:", error.message);
    }

    return null;
  }
};


