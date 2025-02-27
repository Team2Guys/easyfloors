import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_BASE_URL, // Replace with your GraphQL API endpoint
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN || ""}`, // If authentication is needed
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
