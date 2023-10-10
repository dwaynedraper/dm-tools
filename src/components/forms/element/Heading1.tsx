import React from 'react';
import { Kaushan_Script, Quintessential } from 'next/font/google';

const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });
const quint = Quintessential({
  weight: '400',
  subsets: ['latin'],
});

interface Heading1Props {
  children: React.ReactNode;
  className?: string;
}

export default function Heading1({
  children,
  className,
}: Heading1Props): React.ReactElement {
  return (
    <h1
      className={`text-3xl font-semibold text-white ${className} ${kaushan.className}`}
    >
      {children}
    </h1>
  );
}
