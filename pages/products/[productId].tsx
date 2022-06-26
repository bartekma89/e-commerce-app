import React from "react";
import { InferGetStaticPropsType } from "next";

import { ProductDetails } from "@/components";
import { StoreApiResponse } from "@/types/Product.types";
import { InferGetStaticPaths } from "@/types/global.types";
import { fetchProducts } from "@/lib/products";

function ProductDetailsPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!data) {
    return <div>Something went wrong</div>;
  }

  return <ProductDetails data={{
    id: data.id,
    title: data.title,
    description: data.description,
    thumbnailAlt: data.title,
    thumbnailUrl: data.image,
    rating: data.rating,
    category: data.category
  }} />;
}

export default ProductDetailsPage;

export const getStaticPaths = async () => {
  const data = await fetchProducts();

  const paths = data.map(({id}) => ({
    params: { productId: id.toString() },
  }));

  return {
    paths,
    fallback: false,
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
    `https://fakestoreapi.com/products/${params.productId}`
  );
  const data: StoreApiResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
