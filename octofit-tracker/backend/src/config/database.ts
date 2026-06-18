import mongoose from 'mongoose';
//octofit_db

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB: ${MONGODB_URI}`);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}
