import React from 'react';
import Layout from '@/components/layout/Layout';
import Tracker from '@/components/Tracker';
import Head from 'next/head';
import Participants from '@/components/Participants';

export default function TrackerPage() {
  return (
    <Layout>
      <Head>
        <title>D&D Initiative Tracker</title>
      </Head>
      <Tracker>
        <Participants />
      </Tracker>
    </Layout>
  );
}
