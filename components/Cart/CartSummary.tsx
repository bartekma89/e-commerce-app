import { useCartState } from "@/context/CartStateContext";
import Link from "next/link";

const CartSummary = () => {
  const cartState = useCartState();

  return (
    <div>
      Cart Summary
      <div className="font-bold">
        Quantity of cart items: {cartState.items.length}
      </div>
      <div className="mt-3 col-span-6">
        <Link href="/checkout">
          <a className="rounded-lg bg-black text-sm p-2.5 text-white w-full flex justify-center">
            Checkout
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
