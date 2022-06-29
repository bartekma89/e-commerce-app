import React from "react";
import { InferGetStaticPropsType } from "next";

import { Pagination, ProductCard } from "@/components";
import { fetchProducts } from "@/lib/products";

function ProductsPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <div className="flex justify-center">
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

export const getStaticProps = async () => {
  const data = await fetchProducts();

  return {
    props: {
      data,
    },
  };
};

export default ProductsPage;
