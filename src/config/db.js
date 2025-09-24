const mongoose = require('mongoose');

async function connectDB(uri) {
  if (!uri) {
    throw new Error('Missing MongoDB connection string');
  }

  try {
    await mongoose.connect(uri);
    if (process.env.NODE_ENV !== 'test') {
      console.log('Connected to MongoDB');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
}

module.exports = connectDB;
