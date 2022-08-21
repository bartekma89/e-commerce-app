import { Main, NewsletterForm } from "@/components";
import {
  CreateProductReviewDocument,
  CreateProductReviewMutation,
  CreateProductReviewMutationVariables,
  useCreateProductReviewMutation,
} from "@/generated/graphql";
import { apolloClient } from "@/graphql/apolloClient";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

function HomePage() {
  const [createReview, { loading, data, error }] =
    useCreateProductReviewMutation();

  const addReview = () =>
    createReview({
      mutation: CreateProductReviewDocument,
      variables: {
        review: {
          headline: "Super produkt 1234",
          email: "example@example.com",
          name: "Bart",
          content: "Bardzo dobry produkt",
          rating: 5,
        },
      },
    });

  return (
    <Main>
      <NewsletterForm />
      <br />
      <form>
        <button onClick={addReview} type="button">
          Add review
        </button>
      </form>
      <div>
        {loading && <div>Loading...</div>}
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </Main>
  );

  return <div>HomePage</div>;
}

// const GET_ALL_PRODUCTS = gql`
//   query GetProductsList {
//     products {
//       id
//       price
//       name
//       slug
//     }
//   }
// `;

// function HomePage() {
//   const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{JSON.stringify(error)}</div>;
//   }

//   return (
//     <div>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );

//   return <div>HomePage</div>;
// }

export default HomePage;
