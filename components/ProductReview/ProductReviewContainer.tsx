import React from "react";
import ProductReviewForm from "./ProductReviewForm";
import ProductReviewList from "./ProductReviewList";

interface ComponentProps {
  productSlug: string;
  productName: string;
}

export default function ProductReviewContainer({
  productSlug,
  productName,
}: ComponentProps) {
  return (
    <>
      <ProductReviewForm productSlug={productSlug} productName={productName} />
      <ProductReviewList productSlug={productSlug} />
    </>
  );
}
