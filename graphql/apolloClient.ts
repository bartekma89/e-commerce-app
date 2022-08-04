import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-eu-central-1.hygraph.com/v2/cl612qdm44hlm01utbjai2e22/master",
  cache: new InMemoryCache(),
});
