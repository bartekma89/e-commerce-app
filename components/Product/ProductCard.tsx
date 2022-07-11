import Image from "next/image";

import { NavLink as Link } from "@/components";
import { formatNumber } from "@/lib/helpers";
import { Pages } from "@/types/Pages.enum";
import { ProductDetails } from "@/types/Product.types";

type ProductCard = Omit<ProductDetails, "description" | "longDescription">;

interface ComponentProps {
  data: ProductCard;
}

function ProductCard({ data }: ComponentProps) {
  return (
    <Link href={`${Pages.PRODUCTS}/product/${data.id}`}>
      <a className="group cursor-pointer border-2 border-transparent shadow-xl rounded-lg">
        <div className="w-full bg-white rounded-t-lg overflow-hidden p-4">
          <Image
            objectFit="contain"
            layout="responsive"
            width={16}
            height={9}
            src={data.thumbnailUrl}
            alt={data.thumbnailAlt}
            className="w-full h-full object-center object-contain group-hover:opacity-75 p-3"
          />
        </div>
        <div className="p-3">
          <h3 className="text-lg sm:text-md text-gray-700">{data.title}</h3>
          <p className="mt-1 text-md italic text-gray-500">{data.category}</p>
          <div className="flex justify-between">
            <p className="mt-1 text-lg font-medium text-gray-900">
              {formatNumber(data.rating.count, "pl-PL", {
                style: "currency",
                currency: "PLN",
              })}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default ProductCard;
