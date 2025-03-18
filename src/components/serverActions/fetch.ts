import client from "config/apolloClient";
import { GET_ADMIN_DATA } from "graphql/queries";

export const getAdminData = async (token?: string) => {
  try {
    const { data } = await client.query({
      query: GET_ADMIN_DATA ,
      context: {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        credentials: 'include',
      },
      fetchPolicy: "no-cache",
    });

    return data?.admin || null;
  } catch (error) {
return error
  }
};
