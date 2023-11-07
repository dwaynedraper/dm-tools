import Ably from "ably/promises";

let key;
if (process.env.NODE_ENV === 'development') {
  key = process.env.NEXT_PUBLIC_ABLY_SERVER_API_KEY;
} else {
  key = process.env.ABLY_SERVER_API_KEY;
}

export default async function handler(req, res) {
  const clientId = req.query.clientId;

  if (!clientId) {
    return res.status(400).json({
      error: "clientId is required",
    });
  }

  const client = new Ably.Realtime(key);


  const tokenRequestData = await client.auth.createTokenRequest({
    clientId,
  });

  res.status(200).json(tokenRequestData);
}