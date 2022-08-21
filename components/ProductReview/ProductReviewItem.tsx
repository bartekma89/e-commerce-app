import { ReviewContentFragment } from "@/generated/graphql";

interface ProductReviewItemProps {
  review: ReviewContentFragment;
}

const ProductReviewItem = ({ review }: ProductReviewItemProps) => {
  const isOptimistic = review.id.startsWith("-");

  return (
    <blockquote
      className={`border mt-4 bg-white p-2 max-w-md shadow-md rounded-md ${
        isOptimistic ? "opacity-50" : ""
      }`}
    >
      <header className="sm:items-center sm:flex">
        {review.rating && <div className="flex -ml-1">{review.rating} / 5</div>}

        <p className="mt-2 font-medium sm:ml-4 sm:mt-0">{review.headline}</p>
      </header>

      <p className="mt-2 text-gray-700">{review.content}</p>

      <footer className="mt-4">
        <p className="text-xs text-gray-500">{review.name}</p>
      </footer>
    </blockquote>
  );
};

export default ProductReviewItem;
