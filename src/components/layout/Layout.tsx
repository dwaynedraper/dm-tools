// React/Next imports
import { useEffect, useRef, useState } from 'react';
import {
  Cinzel_Decorative,
  Kaushan_Script,
  Quintessential,
} from 'next/font/google';

// Component imports
import ChatBar from '@/components/layout/ChatBar';
import Sidebar from '@/components/layout/Sidebar';

// Other imports
import { gsap } from 'gsap';

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
  const boxRef = useRef(null);

  return (
    <div className="flex w-full h-screen" ref={boxRef}>
      <Sidebar />
      <main className={`h-screen w-full`}>{children}</main>
      <ChatBar />
    </div>
  );
}
