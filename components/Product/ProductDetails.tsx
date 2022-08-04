import Image from "next/image";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { ProductDetails } from "@/types/Product.types";
import { Markdown, Rating } from "@/components";

interface ComponentProps {
  data: ProductDetails;
}

function ProductDetails({ data }: ComponentProps) {
  const { back } = useRouter();

  return (
    <>
      <button onClick={back} type="button">
        Back
      </button>
      <hr />
      <NextSeo
        title={data.title}
        description={data.description}
        canonical={`https://e-commerce-next-app.vercel.app/products/product/${data.id}`}
        openGraph={{
          url: `https://e-commerce-next-app.vercel.app/products/product/${data.id}`,
          title: data.title,
          description: data.description,
          images: [
            {
              url: data.thumbnailUrl,
              alt: data.thumbnailAlt,
              type: "image/jpeg",
            },
          ],
          site_name: "Nasz sklep",
        }}
      />
      <div className="bg-white p-4">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout="responsive"
          width={16}
          height={9}
          objectFit="contain"
        />
      </div>
      <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      <p className="p-4">{data.description}</p>
      <Rating rating={data.rating} />
      <article className="prose lg:prose-xl">
        <Markdown>{data.longDescription}</Markdown>
      </article>
    </>
  );
}

export default ProductDetails;
