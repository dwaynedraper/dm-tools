import React from 'react'
import { GetServerSideProps } from 'next'
import { Actor } from '@/types/actor'
import DiceRoller from '@/components/DiceRoller'
import Layout from '@/components/Layout'
import Tracker from '@/components/Tracker'
import clientPromise from '@/lib/mongodb'

export const getServerSideProps = async () => {
  try {
    //Establish connection and connect to database
    const client = await clientPromise
    const db = client.db('dmTools')

    //Get all actors from the database
    const actors = await db.collection('actors').find({}).toArray()

    //Return the actors
    return {
      props: {
        actors: JSON.parse(JSON.stringify(actors)),
      },
    }
  } catch (error) {
    console.error(error)
  }
}

export default function tracker({ actors }) {
  console.log('party', actors)

  return (
    <Layout>
      <Tracker />
    </Layout>
  )
}
