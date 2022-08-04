import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { serialize } from "next-mdx-remote/serialize";

import { ProductDetails } from "@/components";
import { InferGetStaticPaths } from "@/types/global.types";
import { apolloClient } from "@/graphql/apolloClient";
import {
  GetProductDetailsBySlugDocument,
  GetProductDetailsBySlugQuery,
  GetProductDetailsBySlugQueryVariables,
  GetProductsSlugsDocument,
  GetProductsSlugsQuery,
} from "@/generated/graphql";

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
        id: data.slug,
        title: data.name,
        description: data.description,
        thumbnailAlt: data.name,
        thumbnailUrl: data.images[0].url,
        rating: 5,
        longDescription: data.longDescription,
        price: data.price,
      }}
    />
  );
}

export default ProductDetailsPage;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetProductsSlugsQuery>({
    query: GetProductsSlugsDocument,
  });

  const paths = data.products.map(({ slug }) => ({
    params: {
      productId: slug,
    },
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

  const { data } = await apolloClient.query<
    GetProductDetailsBySlugQuery,
    GetProductDetailsBySlugQueryVariables
  >({
    variables: {
      slug: params.productId,
    },
    query: GetProductDetailsBySlugDocument,
  });

  if (!data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data.product,
        longDescription: await serialize(data.product.description),
      },
    },
  };
};
