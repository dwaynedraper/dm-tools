import { useEffect, useState } from 'react';
import Ably from 'ably/promises';
import { configureAbly } from '@ably-labs/react-hooks';

let key: string | undefined;
if (process.env.NODE_ENV === 'development') {
  key = process.env.NEXT_PUBLIC_ABLY_SERVER_API_KEY;
} else {
  key = process.env.ABLY_SERVER_API_KEY;
}

let url: string | undefined;
if (process.env.NODE_ENV === 'development') {
  url = process.env.NEXT_PUBLIC_HOSTNAME;
} else {
  url = process.env.VERCEL_URL;
}

const ably = new Ably.Realtime.Promise({
  key,
  authUrl: `${url}/api/createTokenRequest`,
});

configureAbly({
  key,
  authUrl: `${url}/api/createTokenRequest`,
});

export function useAblyChat(channelName: string) {
  const channel = ably.channels.get(channelName);
  const [chatLog, setChatLog] = useState<string[]>([
    'Real-time Serverless Websocket Chat Placeholder',
    // ... your placeholder messages
  ]);
  useEffect(() => {
    const subscribe = async () => {
      await channel.subscribe((message) => {
        setChatLog((prevChatLog) => [...prevChatLog, message.data]);
      });
    };
    subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);
  const sendMessage = async (text: string) => {
    await channel.publish({ name: 'message', data: text });
  };
  return { chatLog, sendMessage };
}
