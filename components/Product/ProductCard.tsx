import Image from "next/image";

import { NavLink as Link } from "@/components";
import { formatNumber } from "@/lib/helpers";
import { Pages } from "@/types/Pages.enum";
import { ProductDetails } from "@/types/Product.types";
import { useCartState } from "@/context/CartStateContext";

type ProductCard = Omit<
  ProductDetails,
  "description" | "longDescription" | "slug"
>;

interface ComponentProps {
  data: ProductCard;
}

function ProductCard({ data }: ComponentProps) {
  const cartState = useCartState();

  return (
    <div className="group cursor-pointer border-2 border-transparent shadow-xl rounded-lg">
      <Link href={`${Pages.PRODUCTS}/product/${data.id}`}>
        <a>
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
                {formatNumber(data.price, "pl-PL", {
                  style: "currency",
                  currency: "PLN",
                })}
              </p>
            </div>
          </div>
        </a>
      </Link>
      <div className="p-3">
        <button
          onClick={() =>
            cartState.addItemToCart({
              id: data.id,
              title: data.title,
              price: data.price,
              count: 1,
            })
          }
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Add product
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
