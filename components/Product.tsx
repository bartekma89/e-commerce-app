import { Rating } from "@/components";

interface ComponentProps {
  data: {
    description: string;
    thumbnailUrl: string;
    thumbnailAlt: string;
    rating: number;
  };
}

export default function Product({ data }: ComponentProps) {
  return (
    <>
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt} />
      <p>{data.description}</p>
      <Rating rating={data.rating}></Rating>
    </>
  );
}
