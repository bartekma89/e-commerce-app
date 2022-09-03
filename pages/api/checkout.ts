import {
  GetProductBySlugDocument,
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables,
} from "@/generated/graphql";
import { apolloClient } from "@/graphql/apolloClient";
import { NextApiHandler } from "next";
import { Stripe } from "stripe";

const checkoutHandler: NextApiHandler = async (req, res) => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    res.status(500).json({ message: "Missing STRIPE_SECRET_KEY" });
    return;
  }

  const body = req.body as {
    slug: string;
    count: number;
  }[];

  console.log(body);

  const products = await Promise.all(
    body.map(async (cartItem) => {
      const product = await apolloClient.query<
        GetProductBySlugQuery,
        GetProductBySlugQueryVariables
      >({
        query: GetProductBySlugDocument,
        variables: {
          slug: cartItem.slug,
        },
      });
      return {
        product,
        count: cartItem.count,
      };
    })
  );

  console.log(products);

  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2022-08-01" });

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "pl",
    payment_method_types: ["p24", "card"],
    success_url:
      "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/checkout/cancel",
    line_items: products.map(({ product, count }) => {
      return {
        adjustable_quantity: {
          enabled: true,
          minimum: 0,
          maximum: 99,
        },
        price_data: {
          currency: "PLN",
          unit_amount: product.data.product!.price,
          product_data: {
            name: product.data.product!.name,
            images: product.data.product!.images.map((i) => i.url),
            metadata: {
              slug: product.data.product!.slug,
            },
          },
        },
        quantity: count,
      };
    }),
  });

  // @todo tworzenie Order w GraphCMS

  res.status(201).json({ session: stripeCheckoutSession });
};

export default checkoutHandler;
