import React, { ReactNode } from "react";

import { Main, Footer, Header } from "@/components";

interface ComponentProps {
  children: ReactNode;
}

export default function Layout({ children }: ComponentProps) {
  return (
    <div className="flex flex-col min-h-screen bg-teal-100">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
