import React from "react";
import Link from "next/link";

import { ProductDetails } from "@/types/Product.types";
import { Pages } from "@/types/Pages.enum";
import { useRouter } from "next/router";

interface ComponentProps {
  data: ProductDetails;
}

function ProductDetails({ data }: ComponentProps) {
  const { back } = useRouter();

  return (
    <div>
      <button onClick={back} type="button">
        Back
      </button>
      <br />
      <p>{data.category}</p>
      <p>{data.description}</p>
      <p>{data.title}</p>
      <p>{data.rating.count}</p>
      <p>{data.rating.rate}</p>
    </div>
  );
}

export default ProductDetails;
