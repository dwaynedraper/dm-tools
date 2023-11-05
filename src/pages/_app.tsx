import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import { useEffect } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import Layout from '@/components/layout/Layout';

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
    <ClerkProvider
      appearance={{
        baseTheme: 'dark',
        layout: {
          socialButtonsPlacement: 'bottom',
        },
        variables: { colorPrimary: '#000000' },
        elements: {
          'cl-formButtonPrimary':
            'bg-black border border-black border-solid hover:bg-white hover:text-black',
          socialButtonsBlockButton:
            'bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black',
          socialButtonsBlockButtonText: 'font-semibold',
          formButtonReset:
            'bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black',
          membersPageInviteButton:
            'bg-black border border-black border-solid hover:bg-white hover:text-black',
          card: 'bg-[#fafafa]',
        },
      }}
      {...pageProps}
    >
      <AblyProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AblyProvider>
    </ClerkProvider>
  );
}
