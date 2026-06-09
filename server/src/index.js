import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app.js';

dotenv.config();

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

async function startServer() {
  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri);
      console.log('MongoDB connected');
    } catch (error) {
      console.warn(`MongoDB connection failed, using fallback content: ${error.message}`);
    }
  } else {
    console.warn('MONGODB_URI not set, using fallback content');
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Server failed to start', error);
  process.exit(1);
});
