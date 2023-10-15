// React/Next imports
import { useEffect, useRef, useState } from 'react';
import {
  Cinzel_Decorative,
  Kaushan_Script,
  Quintessential,
} from 'next/font/google';

// Component imports
import ChatBar from './ChatBar';
import Sidebar from './Sidebar';

// Other imports
import { gsap } from 'gsap';
// import { configureAbly } from '@ably-labs/react-hooks';
// import Ably from 'ably/promises';

const cinzel = Cinzel_Decorative({ subsets: ['latin'], weight: ['400'] });
const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });
const quint = Quintessential({
  weight: '400',
  subsets: ['latin'],
});

//Register GSAP plugins
gsap.registerPlugin();

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.ReactElement {
  // const [chatLog, setChatLog] = useState<string[]>([
  //   'Real-time Serverless Websocket Chat Placeholder',
  //   // ... your placeholder messages
  //   // TODO: Add tutorial-style messages as placeholders or
  //   // TODO: possibly a customized greeting when a user joins the chat
  // ]);

  // useEffect(() => {
  //   // Subscribe to the channel for messages
  //   const subscribe = async () => {
  //     await channel.subscribe((message) => {
  //       setChatLog((prevChatLog) => [...prevChatLog, message.data]); // Append the new message to the chatLog
  //     });
  //   };

  //   subscribe();

  //   // Cleanup
  //   return () => {
  //     channel.unsubscribe();
  //   };
  // }, []);

  // const sendMessage = async (text: string) => {
  //   console.log('clicked');
  //   await channel.publish({ name: 'message', data: text });
  // };

  const boxRef = useRef(null);

  return (
    <div className="flex w-full h-screen" ref={boxRef}>
      <Sidebar />
      <main className={`h-screen w-full`}>{children}</main>
      <ChatBar />
    </div>
  );
}
