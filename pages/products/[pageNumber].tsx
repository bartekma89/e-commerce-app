import React from "react";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import { Pagination, ProductCard } from "@/components";
import { StoreApiResponse } from "@/types/Product.types";
import { ITEMS_PER_PAGE, TOTAL_PAGE } from "@/constants";
import { InferGetStaticPaths } from "@/types/global.types";
import { apolloClient } from "@/graphql/apolloClient";
import {
  GetProductsListDocument,
  GetProductsListQuery,
} from "@/generated/graphql";

async function fetchProducts(currentPage: string) {
  const OFF_SET = ITEMS_PER_PAGE * Number(currentPage) - ITEMS_PER_PAGE;
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${ITEMS_PER_PAGE}&offset=${OFF_SET}`
  );
  const data: StoreApiResponse[] | [] = await res.json();
  return data;
}

function ProductsPage({
  data,
  currentPage,
  totalPages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isFallback, push } = useRouter();

  if (isFallback) {
    return <div>Loading ...</div>;
  }

  if (!data || !totalPages) {
    return <div>Something went wrong</div>;
  }

  const handlePagination = (page: number) => {
    push(`/products/${page}`);
  };

  return (
    <div className="mt-5">
      {/* <div className="flex justify-center mt-5 mb-7">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          handlePagination={handlePagination}
        />
      </div> */}
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8">
        {data.products.map((product) => (
          <ProductCard
            key={product.slug}
            data={{
              id: product.slug,
              title: product.name,
              thumbnailUrl: product.images[0].url,
              thumbnailAlt: product.name,
              price: product.price,
              category: product.categories[0].name,
              rating: 5,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const paths = Array.from({ length: TOTAL_PAGE }, (_, idx) => {
    return {
      params: {
        pageNumber: String(idx + 1),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.pageNumber) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { data } = await apolloClient.query<GetProductsListQuery>({
    query: GetProductsListDocument,
  });

  const numberOfProducts = data.products.length;
  const totalPages = Math.floor(numberOfProducts / ITEMS_PER_PAGE);
  const currentPage = Number(params.pageNumber);

  if (!data) {
    return {
      props: {},
      norFound: true,
    };
  }

  return {
    props: {
      data,
      totalPages: totalPages === 0 ? 1 : totalPages,
      currentPage,
    },
  };
};

export default ProductsPage;
