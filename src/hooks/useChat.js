// useChat.js
import { useState, useEffect, useContext } from 'react';
import { AblyContext } from '@/contexts/AblyContext';

export function useChat(channelName) {
  const ably = useContext(AblyContext);
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    if (!ably) return;

    const channel = ably.channels.get(channelName);

    const subscribe = async () => {
      await channel.subscribe((message) => {
        setChatLog((prevChatLog) => [...prevChatLog, message.data]);
      });
    };

    subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [ably, channelName]);

  const sendMessage = async (text) => {
    const channel = ably.channels.get(channelName);
    await channel.publish({ name: 'message', data: text });
  };

  return { chatLog, sendMessage };
}
