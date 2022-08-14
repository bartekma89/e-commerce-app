import {
  CreateProductReviewDocument,
  useCreateProductReviewMutation,
} from "@/generated/graphql";
import { useForm } from "react-hook-form";

export default function ReviewTextarea() {
  const { register, handleSubmit, setValue } = useForm<{
    review: string;
  }>();

  const [createReview, { loading }] = useCreateProductReviewMutation();

  const addReview = handleSubmit((data) => {
    createReview({
      mutation: CreateProductReviewDocument,
      variables: {
        review: {
          headline: "Super produkt 1234",
          email: "test@test.com",
          name: "User",
          content: data.review,
        },
      },
    }).then(() => {
      setValue("review", "");
    });
  });

  return (
    <div>
      <h2 className="text-xl font-bold sm:text-2xl">Add Review</h2>
      <form onSubmit={addReview}>
        <textarea
          {...register("review")}
          className="w-full p-3 text-sm border-gray-200 rounded-lg"
          rows={8}
        />
        <button
          className="relative inline-block group focus:outline-none focus:ring"
          type="submit"
          disabled={loading}
        >
          <span className="absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-yellow-300 group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest text-black uppercase border-2 border-current group-active:text-opacity-75">
            Submit Review
          </span>
        </button>
      </form>
    </div>
  );
}
