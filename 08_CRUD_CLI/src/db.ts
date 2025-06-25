import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || '';
const client = new MongoClient(MONGO_URI);

try {
  await client.connect();
  console.log('✅ Connected to MongoDB');
} catch (err) {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
}

export const db = client.db();
