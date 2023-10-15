import Ably from "ably";

let key;
if (process.env.NODE_ENV === 'development') {
  key = process.env.NEXT_PUBLIC_ABLY_SERVER_API_KEY;
} else {
  key = process.env.ABLY_SERVER_API_KEY;
}

const rest = new Ably.Rest.Promise({
  key,
});

const channel = rest.channels.get("headlines");

export async function getHistoricalMessages() {
  const resultPage = await channel.history({ limit: 5 });
  /* 
    See issue: https://github.com/vercel/next.js/issues/11993. 
    The JSON must be re-parsed or certain Message object items
    cannot be serialized by props later.
  */
  const historicalMessages = JSON.parse(JSON.stringify(resultPage.items));
  return historicalMessages;
}