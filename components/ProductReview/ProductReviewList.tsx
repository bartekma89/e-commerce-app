import { useGetReviewsForProductSlugQuery } from "@/generated/graphql";
import ProductReviewItem from "./ProductReviewItem";

interface ComponentProps {
  productSlug: string;
}

function ProductReviewList({ productSlug }: ComponentProps) {
  const { data } = useGetReviewsForProductSlugQuery({
    variables: {
      slug: productSlug,
    },
  });

  if (!data?.product?.reviews.length) {
    return null;
  }

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-x-16 gap-y-12">
          {data.product.reviews.map((review) => (
            <ProductReviewItem key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductReviewList;
