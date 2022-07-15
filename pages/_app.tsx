import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { DefaultSeo } from "next-seo";

import { Layout } from "@/components";
import SEO from "@/next-seo.config";
import { CartStateContextProvider } from "@/context/CartStateContext";

import "@/styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartStateContextProvider>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </Layout>
    </CartStateContextProvider >
  );
}

export default MyApp;
