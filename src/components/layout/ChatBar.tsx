// Import necessary packages
import React, { useState, useEffect } from 'react';
import Ably from 'ably/promises';
import classNames from 'classnames';

// Initialize Ably
const ably = new Ably.Realtime.Promise({
  key: process.env.NEXT_PUBLIC_ABLY_SERVER_API_KEY,
});
const channel = ably.channels.get('chat');

interface ChatBubbleProps {
  text: string;
}

function ChatBubble({ text }: ChatBubbleProps) {
  return (
    <div
      className={classNames(
        `flex justify-between items-center mb-2 px-4 py-2 rounded-2xl text-slate-200 border border-slate-200/10 bg-slate-700`,
      )}
    >
      {text}
    </div>
  );
}

export default function ChatBar() {
  const [chatLog, setChatLog] = useState<string[]>([
    'Real-time Serverless Websocket Chat Placeholder',
    // ... your placeholder messages
  ]);

  useEffect(() => {
    // Subscribe to the channel for messages
    const subscribe = async () => {
      await channel.subscribe((message) => {
        setChatLog((prevLog) => [...prevLog, message.data]);
      });
    };

    subscribe();

    // Cleanup
    return () => {
      channel.unsubscribe();
    };
  }, []);

  const sendMessage = async (text: string) => {
    await channel.publish({ name: 'message', data: text });
  };

  return (
    <div className={`h-screen px-2 w-192 bg-slate-800`}>
      <div
        className={`h-full overflow-y-auto scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-cyan-700 scrollbar-thumb-rounded py-2 pr-2`}
      >
        {chatLog.map((el, index) => (
          <ChatBubble key={index} text={el} />
        ))}
        <button
          className="text-white bg-red-600"
          onClick={() => sendMessage('Your Message')}
        >
          Send
        </button>
      </div>
    </div>
  );
}
