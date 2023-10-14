import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Tracker from '@/components/Tracker';
import AddActorForm from '@/components/AddActorForm';
import Head from 'next/head';
import Participants from '@/components/Participants';
import Articles from '@/components/Articles';
import { getHistoricalMessages } from '@/lib/history';
import { configureAbly } from '@ably-labs/react-hooks';

configureAbly({
  authUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/createTokenRequest`,
});

export default function TrackerPage(props) {
  return (
    <Layout>
      <Head>
        <title>D&D Initiative Tracker</title>
      </Head>
      <Tracker>
        <Participants />
        <Articles history={props.history} />
      </Tracker>
    </Layout>
  );
}

export async function getStaticProps() {
  const historicalMessages = await getHistoricalMessages();

  return {
    props: {
      history: historicalMessages,
    },
    //enable ISR
    revalidate: 10,
  };
}
