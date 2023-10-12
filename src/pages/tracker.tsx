import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Tracker from '@/components/Tracker';
import AddActorForm from '@/components/AddActorForm';
import Head from 'next/head';

import { configureAbly } from '@ably-labs/react-hooks';

configureAbly({
  authUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/createTokenRequest`,
});

export default function TrackerPage() {
  return (
    <Layout>
      <Head>
        <title>D&D Initiative Tracker</title>
      </Head>
      <Tracker>
        <></>
      </Tracker>
    </Layout>
  );
}
