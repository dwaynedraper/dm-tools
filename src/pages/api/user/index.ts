import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Insert User endpoint
    try {
      const client = await clientPromise;
      const db = client.db('dmTools');
      const user = await db.collection('users').insertOne(req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
