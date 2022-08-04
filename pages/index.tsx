import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

const GET_ALL_PRODUCTS = gql`
  query GetProductsList {
    products {
      id
      price
      name
      slug
    }
  }
`;

function HomePage() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );

  return <div>HomePage</div>;
}

export default HomePage;
