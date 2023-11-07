// React/Next imports
import type { AppProps } from 'next/app';

// Component imports
import Layout from '@/components/layout/Layout';
import AblyComponent from '@/components/AblyComponent';

// Other imports
import '@/styles/globals.scss';
import { ClerkProvider } from '@clerk/nextjs';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: 'dark',
        layout: {
          socialButtonsPlacement: 'bottom',
        },
        variables: { colorPrimary: '#000000' },
        elements: {
          formButtonPrimary:
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
      <AblyComponent>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AblyComponent>
    </ClerkProvider>
  );
}
