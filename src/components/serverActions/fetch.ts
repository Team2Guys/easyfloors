import { store } from "redux/store";
import { loggedInAdminAction } from "redux/slices/Admin/AdminsSlice";

export const getAdminData = async (token: string | undefined) => {
  if (!token) return;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query GetAdmin {
            admin {
              id
              fullname
              email
              role
              posterImageUrl
            }
          }
        `,
      }),
    });

    const result = await response.json();
    console.log("Fetched Admin Data:", result); // ✅ Log response

    if (result?.data?.admin) {
      console.log("Dispatching Admin Data:", result.data.admin);

      // ✅ Log Redux state BEFORE dispatch
      console.log("Redux State Before Dispatch:", store.getState());

      store.dispatch(loggedInAdminAction(result.data.admin)); // ✅ Ensure dispatch

      // ✅ Log Redux state AFTER dispatch
      console.log("Redux State After Dispatch:", store.getState().usersSlice.loggedInUser);
    } else {
      console.warn("No admin data found");
    }

    return result.data?.admin || null;
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return null;
  }
};
