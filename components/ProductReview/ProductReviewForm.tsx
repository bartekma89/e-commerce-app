import {
  CreateProductReviewDocument,
  GetReviewsForProductSlugDocument,
  GetReviewsForProductSlugQuery,
  GetReviewsForProductSlugQueryVariables,
  useCreateProductReviewMutation,
} from "@/generated/graphql";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const reviewFormSchema = yup
  .object({
    content: yup.string().required(),
    headline: yup.string().required(),
    name: yup.string().required(),
    rating: yup.number().min(1).max(5).required(),
    email: yup.string().email().required(),
  })
  .required();

type ReviewFormData = yup.InferType<typeof reviewFormSchema>;

interface ComponentProps {
  productSlug: string;
  productName: string;
}

export default function ProductReviewForm({
  productSlug,
  productName,
}: ComponentProps) {
  const { register, handleSubmit, reset } = useForm<ReviewFormData>({
    resolver: yupResolver(reviewFormSchema),
  });

  // add review
  // const [createReview, { loading }] = useCreateProductReviewMutation({
  //   refetchQueries: [
  //     {
  //       query: GetReviewsForProductSlugDocument,
  //       variables: {
  //         slug: productSlug,
  //       },
  //     },
  //   ],
  // });

  // add review with optimistic update
  const [createReview, { loading }] = useCreateProductReviewMutation({
    update(cache, result) {
      const origialReviewsQuery = cache.readQuery<
        GetReviewsForProductSlugQuery,
        GetReviewsForProductSlugQueryVariables
      >({
        query: GetReviewsForProductSlugDocument,
        variables: {
          slug: productSlug,
        },
      });

      if (!origialReviewsQuery?.product?.reviews || !result.data?.review) {
        return;
      }

      // result.data?.review

      const newReviewsQuery = {
        ...origialReviewsQuery,
        product: {
          ...origialReviewsQuery.product,
          reviews: [...origialReviewsQuery.product.reviews, result.data.review],
        },
      };

      console.log(newReviewsQuery);

      cache.writeQuery({
        query: GetReviewsForProductSlugDocument,
        variables: {
          slug: productSlug,
        },
        data: newReviewsQuery,
      });
    },
  });

  const addReview = handleSubmit((data) => {
    console.log(data);
    createReview({
      mutation: CreateProductReviewDocument,
      variables: {
        review: {
          ...data,
          product: {
            connect: {
              slug: productSlug,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        review: {
          __typename: "Review",
          product: {
            __typename: "Product",
            name: productName,
          },
          id: (-Math.random()).toString(),
          ...data,
        },
      },
    });
    // .then(() => {
    //   reset();
    // });
  });

  return (
    <div className="p-4 max-w-md flex flex-col mx-auto">
      <h2 className="text-xl font-bold sm:text-2xl">Add Review</h2>
      <form onSubmit={addReview}>
        <label htmlFor="content">Content</label>
        <input
          id="content"
          type="text"
          {...register("content")}
          className="w-full p-3 text-sm border-gray-200 rounded-lg"
        />
        <label htmlFor="headline">Headline</label>
        <input
          id="headline"
          type="text"
          {...register("headline")}
          className="w-full p-3 text-sm border-gray-200 rounded-lg"
        />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full p-3 text-sm border-gray-200 rounded-lg"
        />
        <label htmlFor="rating">Rating</label>
        <input
          id="rating"
          type="number"
          {...register("rating")}
          className="w-full p-3 text-sm border-gray-200 rounded-lg"
        />
        <label htmlFor="rating">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full p-3 text-sm border-gray-200 rounded-lg"
        />
        <button
          className="inline-block px-12 py-3 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring mt-4"
          type="submit"
          disabled={loading}
        >
          Add Review
        </button>
      </form>
    </div>
  );
}
