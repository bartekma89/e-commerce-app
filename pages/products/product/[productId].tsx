import React from "react";
import { InferGetStaticPropsType } from "next";

import { ProductDetails } from "@/components";
import { StoreApiResponse } from "@/types/Product.types";
import { InferGetStaticPaths } from "@/types/global.types";
import { ITEMS_PER_PAGE, TOTAL_PAGE } from "@/constants";
import { useRouter } from "next/router";
// import { fetchProducts } from "@/lib/products";

async function fetchProducts(currentPage: string) {
  const OFF_SET = ITEMS_PER_PAGE * Number(currentPage) - ITEMS_PER_PAGE;
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${ITEMS_PER_PAGE}&offset=${OFF_SET}`
  );
  const data: StoreApiResponse[] | [] = await res.json();
  return data;
}

function ProductDetailsPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Something went wrong</div>;
  }

  return (
    <ProductDetails
      data={{
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnailAlt: data.title,
        thumbnailUrl: data.image,
        rating: data.rating,
        category: data.category,
      }}
    />
  );
}

export default ProductDetailsPage;

export const getStaticPaths = async () => {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${
      ITEMS_PER_PAGE
      //  * TOTAL_PAGE
    }`
  );
  const data: StoreApiResponse[] | [] = await res.json();

  const paths = data.map(({ id }) => ({
    params: { productId: id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }

  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${params.productId}`
  );
  const data: StoreApiResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
