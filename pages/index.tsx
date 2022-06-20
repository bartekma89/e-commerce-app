import { Product } from "@/components";

import products from "@/data/products.json";

const Home = () =>
  products.map((product) => (
    <Product key={product.thumbnailUrl} data={product} />
  ));

export default Home;
