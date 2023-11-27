import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { email, ...userData } = req.body;

    // Ensure you have a unique identifier for the user, typically an email or user ID
    const query = { email: email };

    // Upsert User endpoint
    try {
      const client = await clientPromise;
      const db = client.db('dmTools');

      // The $set operator replaces the value of a field with the specified value
      const update = { $set: userData };

      // Set the upsert option to true so that a new document is created if one doesn't already exist
      const options = { upsert: true, returnDocument: 'after' };

      const result = await db
        .collection('users')
        .updateOne(query, update, options);

      if (result.upsertedCount > 0) {
        // A new document was created
        res.status(201).json({ message: 'User created', details: result });
      } else if (result.modifiedCount > 0) {
        // An existing document was updated
        res.status(200).json({ message: 'User updated', details: result });
      } else {
        // No new document was created and no existing document was updated
        res
          .status(200)
          .json({ message: 'No changes made to user', details: result });
      }
    } catch (error: unknown) {
      // TypeScript 4.0+ syntax for catch clause typing
      // Narrow down the type of `error` to `Error` using a type assertion
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        // If it's not an Error instance, send a generic error message
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  } else {
    // Handle other HTTP methods or return a method not allowed error
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
