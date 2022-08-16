// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST").status(405).json({});
    return;
  }

  const email = req.body.email;

  if (typeof email !== "string") {
    return res.status(400).json({});
  }

  const MAILlITE_API_KEY = process.env.MAILlITE_API_KEY;
  const MAILLITE_GROUP_ID = process.env.MAILLITE_GROUP_ID;

  if (!MAILLITE_GROUP_ID || !MAILlITE_API_KEY) {
    return res.status(500).json({
      error: "Źle zmienne środowiskowe",
    });
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-MailerLite-ApiKey": MAILlITE_API_KEY,
    },
    body: JSON.stringify({
      email,
    }),
  };

  const response = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${MAILLITE_GROUP_ID}/subscribers`,
    options
  );

  if (!response.ok) {
    return res.status(500).json({
      error: "Pojawił się błąd przy zapisie do Newslettera",
    });
  }

  return res.status(201).json({});
};

export default handler;
