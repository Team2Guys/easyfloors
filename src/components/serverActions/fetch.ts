
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

    return result.data?.admin || null;
  } catch (error) {
    return null;
    throw error
  }
};
