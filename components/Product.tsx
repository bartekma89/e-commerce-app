import { Rating } from "@/components";
import { Product } from "@/types/Product.types";

interface ComponentProps {
  data: Product;
}

export default function ProductCmp({ data }: ComponentProps) {
  return (
    <>
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt} />
      <p>{data.description}</p>
      <Rating rating={data.rating}></Rating>
    </>
  );
}
