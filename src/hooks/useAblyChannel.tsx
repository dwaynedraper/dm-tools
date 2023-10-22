// useAblyChannel.tsx
import { useState } from 'react';
import { useAbly, useChannel, usePresence } from 'ably/react';

interface useAblyProps {
  channelName: string;
}

interface Message {
  clientId: string;
  data: string;
  name: string;
  id: string;
  connectionId: string;
  timestamp: number;
}

export function useAblyChannel(channelName: string) {
  const [messages, setMessages] = useState<Message[]>([]);

  const { channel } = useChannel(channelName, (message: Message) => {
    setMessages((prev) => [...prev, message]);
  });

  const sendMessage = (message: string) => {
    if (channel === null) return;
    channel.publish('chat', message);
  };

  const { presenceData, updateStatus } = usePresence(
    'chat',
    'initialPresenceStatus',
  );

  const ably = useAbly();

  const clientId = ably?.auth.clientId;
  console.log('client', clientId);

  return { clientId, messages, sendMessage, presenceData, updateStatus };
}
