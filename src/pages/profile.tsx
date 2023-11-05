import React from 'react';
import Layout from '@/components/layout/Layout';
import Tracker from '@/components/Tracker';
import Head from 'next/head';
import DiceRoller from '@/components/DiceRoller';
import Profile from '@/components/Profile';

export default function TrackerPage() {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Profile />
    </>
  );
}
