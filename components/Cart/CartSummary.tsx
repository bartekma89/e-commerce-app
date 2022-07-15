import { useCartState } from "@/context/CartStateContext";

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

export default CartSummary;
