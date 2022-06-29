import { NavLink as Link } from "@/components";
import { formatNumber } from "@/lib/helpers";
import { Pages } from "@/types/Pages.enum";
import { ProductDetails } from "@/types/Product.types";

type ProductCard = Omit<ProductDetails, "description">;

interface ComponentProps {
  data: ProductCard;
}

function ProductCard({ data }: ComponentProps) {
  return (
    <Link href={`${Pages.PRODUCTS}/${data.id}`}>
      <a className="group cursor-pointer border-2 border-transparent shadow-xl rounded-lg">
        <div className="w-full aspect-w-1 aspect-h-1 bg-white rounded-t-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <img
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
