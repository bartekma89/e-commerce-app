import React from "react";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import { Pagination, ProductCard } from "@/components";
import { StoreApiResponse } from "@/types/Product.types";
import { ITEMS_PER_PAGE, TOTAL_PAGE } from "@/constants";
import { InferGetStaticPaths } from "@/types/global.types";

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

  if (!data) {
    return <div>Something went wrong</div>;
  }

  const handlePagination = (page: number) => {
    push(`/products/${page}`);
  };

  return (
    <div>
      <div className="flex justify-center mt-5 mb-7">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          handlePagination={handlePagination}
        />
      </div>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8">
        {data.map(({ id, title, image, category, rating }) => (
          <ProductCard
            key={id}
            data={{
              id,
              title,
              thumbnailUrl: image,
              thumbnailAlt: title,
              category,
              rating,
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
        productsPageNumber: String(idx + 1),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productsPageNumber) {
    return {
      props: {},
      notFound: true,
    };
  }

  const data = await fetchProducts(params.productsPageNumber);

  return {
    props: {
      data,
      totalPages: TOTAL_PAGE,
      currentPage: Number(params.productsPageNumber),
    },
  };
};

export default ProductsPage;
