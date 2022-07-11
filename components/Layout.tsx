import React, { ReactNode } from "react";

import { NextSeo } from "next-seo";

import { Main, Footer, Header } from "@/components";

interface ComponentProps {
  children: ReactNode;
}

export default function Layout({ children }: ComponentProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NextSeo title="test sklepu" description="opis sklepu" />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
