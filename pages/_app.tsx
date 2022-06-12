import type { AppProps } from "next/app";

import { Layout } from "@/components";

import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <p className="text-5xl font-bold text-center text-red-500 mt-6 rounded-3xl border-8">Hej</p>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
