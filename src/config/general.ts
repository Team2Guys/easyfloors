import { DocumentNode } from "graphql";
import client from "./apolloClient";
import { FIND_ONE_REDIRECT_URL, GET_Redirecturls } from "graphql/general";

export const fetchRedirectUrls = async (FIND_QUICK_VIEW_PRODUCT?: DocumentNode) => {
  try {
    const { data } = await client.query({
      query: FIND_QUICK_VIEW_PRODUCT ? FIND_QUICK_VIEW_PRODUCT : GET_Redirecturls,

      fetchPolicy: "no-cache",
      context: {
        credentials: "include",
        fetchOptions: { next: { tags: ["RedirectUrls"] } },

      },


    });

    return data?.findAllRedirecturls;
  } catch (error) {
    return null;
    throw error;
  }
};


export const findOneRedirectUrl = async (
  url: string,
  CUSTOM_MUTATION?: DocumentNode
) => {
  try {
    const { data } = await client.mutate({
      mutation: CUSTOM_MUTATION ? CUSTOM_MUTATION : FIND_ONE_REDIRECT_URL,
      variables: { url },
      context: {
        fetchOptions: {
          credentials: 'include',
          next: { tags: ["RedirectUrls"] }
        },
      },
    });

    return data?.findOneRedirecturls || null;
  } catch (err) {
    console.log(err)
    throw null;
  }
};