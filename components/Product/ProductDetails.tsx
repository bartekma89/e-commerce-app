import React from "react";
import Link from 'next/link'

import { ProductDetails } from "@/types/Product.types";

interface ComponentProps {
  data: ProductDetails;
}

function ProductDetails({ data }: ComponentProps) {
  return (
    <div>
      <Link href="/products">
        <a>Back</a>
      </Link>
      <p>{data.category}</p>
      <p>{data.description}</p>
      <p>{data.title}</p>
      <p>{data.rating.count}</p>
      <p>{data.rating.rate}</p>
    </div>
  );
}

export default ProductDetails;