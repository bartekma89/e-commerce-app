import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";
import { DefaultSeo } from "next-seo";

import { Layout } from "@/components";
import SEO from "@/next-seo.config";
import { CartStateContextProvider } from "@/context/CartStateContext";

import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/graphql/apolloClient";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <CartStateContextProvider>
        <Layout>
          <QueryClientProvider client={queryClient}>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </QueryClientProvider>
        </Layout>
      </CartStateContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
