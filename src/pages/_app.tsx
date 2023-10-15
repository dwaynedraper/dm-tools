import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { AblyProvider } from '@/contexts/AblyContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AblyProvider>
      <Component {...pageProps} />
    </AblyProvider>
  );
}
