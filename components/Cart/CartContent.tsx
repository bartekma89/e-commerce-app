import TrashIcon from "@heroicons/react/outline/TrashIcon";
import { loadStripe } from "@stripe/stripe-js";

import { useCartState } from "@/context/CartStateContext";
import { formatNumber } from "@/lib/helpers";
import Stripe from "stripe";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CartContent = () => {
  const cartState = useCartState();

  const pay = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error("Something went wrong");
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        cartState.items.map((cartItem) => {
          return {
            slug: cartItem.id,
            count: cartItem.count,
          };
          // return {
          //   price_data: {
          //     currency: "PLN",
          //     unit_amount: Math.round(cartItem.price * 100),
          //     product_data: {
          //       name: cartItem.title,
          //     },
          //   },
          //   quantity: cartItem.count,
          // };
        })
      ),
    });

    const { session }: { session: Stripe.Response<Stripe.Checkout.Session> } =
      await res.json();

    await stripe.redirectToCheckout({ sessionId: session.id });
  };

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
      {cartState.items.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <button
          onClick={pay}
          className="rounded-lg bg-black text-sm p-2.5 text-white w-full flex justify-center"
        >
          Submit your order
        </button>
      )}
    </div>
  );
};

export default CartContent;
