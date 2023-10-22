import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import { useEffect } from 'react';

const client = new Ably.Realtime.Promise({
  authUrl: '/api/createTokenRequest',
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleBeforeUnload = () => {
      client.connection.close();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return (
    <AblyProvider client={client}>
      <Component {...pageProps} />
    </AblyProvider>
  );
}
