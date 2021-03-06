import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { serialize } from 'next-mdx-remote/serialize'

import { ProductDetails } from "@/components";
import { StoreApiResponse } from "@/types/Product.types";
import { InferGetStaticPaths } from "@/types/global.types";
import { ITEMS_PER_PAGE } from "@/constants";

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
        longDescription: data.longDescription,
      }}
    />
  );
}

export default ProductDetailsPage;

export const getStaticPaths = async () => {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${ITEMS_PER_PAGE}`
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
  const data: StoreApiResponse | null = await res.json();

  if (!data) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data,
        longDescription: await serialize(data.longDescription)
      }
    },
  };
};
