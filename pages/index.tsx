import { Product } from "@/components";

const DATA = {
  description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
  officia possimus laudantium esse laborum deserunt! Officia, ducimus
  dolorem. Labore dolorem nesciunt mollitia odit dolor non rerum aut
  quasi amet eveniet.`,
  thumbnailUrl: "https://picsum.photos/id/237/200/300",
  thumbnailAlt: "cos tam cos tam",
  rating: 4.5,
};

const Home = () => <Product data={DATA} />;

export default Home;
