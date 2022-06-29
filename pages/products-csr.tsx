import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

import { Pagination, ProductCard } from "@/components";
import { StoreApiResponse } from "@/types/Product.types";
import { ITEMS_PER_PAGE, TOTAL_PAGE } from "@/constants";

async function getProducts(currentPage: number) {
  const OFF_SET = ITEMS_PER_PAGE * currentPage - ITEMS_PER_PAGE;
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${ITEMS_PER_PAGE}&offset=${OFF_SET}`
  );
  const data: StoreApiResponse[] = await res.json();
  return data;
}

function ProductsPage() {
  const [page, setPage] = React.useState(1);
  const { data, isLoading, error } = useQuery(
    ["products", page],
    () => getProducts(page),
    { keepPreviousData: true }
  );
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || error) {
    return <div>Something went wrong</div>;
  }

  const handlePages = (value: number) => {
    setPage(value);
  };

  return (
    <div>
      <div className="flex justify-center mt-5 mb-7">
        <Pagination
          page={page}
          totalPages={TOTAL_PAGE}
          handlePagination={handlePages}
        ></Pagination>
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

export default ProductsPage;
