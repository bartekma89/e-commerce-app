import { CartContent, CartSummary } from "@/components";

function CartPage() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <CartContent />
      <CartSummary />
    </div>
  );
}

export default CartPage;
