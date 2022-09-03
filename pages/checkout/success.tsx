import { useRouter } from "next/router";

function CheckoutSuccessPage() {
  const router = useRouter();

  return <div>Success!!! - {router.query.session_id}</div>;
}

export default CheckoutSuccessPage;
