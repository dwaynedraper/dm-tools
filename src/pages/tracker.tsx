import React from 'react'
import { GetServerSideProps } from 'next'
import { Actor } from '@/types/actor'
import DiceRoller from '@/components/DiceRoller'
import Layout from '@/components/Layout'
import Tracker from '@/components/Tracker'

export const getServerSideProps = async () => {
  const response = await fetch(`http://localhost:3000/api/party/actors`)
  const party = await response.json()

  return {
    props: { party },
  }
}

export default function tracker({ party }) {
  console.log('party', party)

  return (
    <Layout>
      <Tracker />
    </Layout>
  )
}
