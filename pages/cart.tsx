import { TrashIcon } from "@heroicons/react/outline";

import { useCartState } from "@/context/CartStateContext";
import { formatNumber } from "@/lib/helpers";

const CartContent = () => {
  const cartState = useCartState();

  return (
    <div className="col-span-2">
      <ul className="divide-y divide-gray-200">
        {cartState.items.map((item, idx) => {
          return (
            <li
              className="p-4 flex justify-between"
              key={`${item.title}_${idx}`}
            >
              <div>
                {item.count} x {item.title}
              </div>
              <div>
                {formatNumber(item.price, "pl-PL", {
                  style: "currency",
                  currency: "pln",
                })}
                <button
                  className="text-red-500 ml-4 self-center"
                  onClick={() => cartState.removeItemFromCart(item.id)}
                >
                  <TrashIcon className=" h-6 w-6" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const CartSummary = () => {
  const cartState = useCartState();

  return (
    <div>
      Cart Summary
      <div className="font-bold">
        Quantity of cart items: {cartState.items.length}
      </div>
    </div>
  );
};

function CartPage() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <CartContent />
      <CartSummary />
    </div>
  );
}

export default CartPage;
