import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { serialize } from "next-mdx-remote/serialize";

import { ProductDetails } from "@/components";
// import { StoreApiResponse } from "@/types/Product.types";
import { InferGetStaticPaths } from "@/types/global.types";
// import { ITEMS_PER_PAGE } from "@/constants";
import { apolloClient } from "@/graphql/apolloClient";
import { gql } from "@apollo/client";

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

interface GetProductsSlugsResponse {
  products: ProductSlug[];
}

interface ProductSlug {
  slug: string;
}

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetProductsSlugsResponse>({
    query: gql`
      query GetProducts {
        products {
          slug
        }
      }
    `,
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

interface GetProductDetailsBySlugResponse {
  product: Product;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  images: Image[];
  price: number;
}

interface Image {
  url: string;
  width: number;
  height: number;
}

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }

  // const res = await fetch(
  //   `https://naszsklep-api.vercel.app/api/products/${params.productId}`
  // );
  // const data: StoreApiResponse | null = await res.json();

  const { data } = await apolloClient.query<GetProductDetailsBySlugResponse>({
    variables: {
      slug: params.productId,
    },
    query: gql`
      query GetProductDetailsBySlug($slug: String) {
        product(where: { slug: $slug }) {
          id
          slug
          name
          description
          images {
            url
            width
            height
          }
          price
        }
      }
    `,
  });

  if (!data) {
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
