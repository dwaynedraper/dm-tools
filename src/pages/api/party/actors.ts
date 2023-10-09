import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      //Establish connection and connect to database
      const client = await clientPromise;
      const db = client.db('dmTools');

      //Get all actors from the database
      const actors = await db.collection('actors').find({}).toArray();

      //Return the actors
      res.status(200).json(actors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  } else if (req.method === 'POST') {
    try {
      //Establish connection and connect to database
      const client = await clientPromise;
      const db = client.db('dmTools');

      //Create a new actor
      const actor = await db.collection('actors').insertOne(req.body);
      res.status(200).json(actor);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
