import { useEffect, useState } from 'react';
import Ably from 'ably/promises';

let key: string | undefined;
if (process.env.NODE_ENV === 'development') {
  key = process.env.NEXT_PUBLIC_ABLY_SERVER_API_KEY;
} else {
  key = process.env.ABLY_SERVER_API_KEY;
}

const ably = new Ably.Realtime.Promise({
  key,
});
const channel = ably.channels.get('chat');

export function useAblyChat() {
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
