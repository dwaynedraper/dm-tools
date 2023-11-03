import React from 'react';
import Layout from '@/components/layout/Layout';
import Tracker from '@/components/Tracker';
import Head from 'next/head';
import DiceRoller from '@/components/DiceRoller';

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
