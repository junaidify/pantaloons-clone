const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('MongoDB URI is not defined in environment variables');
      process.exit(1);
    }
    
    await mongoose.connect(mongoURI);
    
    console.log('MongoDB connected successfully');
    console.log(`Database connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

module.exports = connectDB;
