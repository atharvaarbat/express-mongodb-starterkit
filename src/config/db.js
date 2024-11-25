const mongoose = require("mongoose");

const dbOptions = {
  serverSelectionTimeoutMS: 5000,    // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000,            // Close sockets after 45 seconds of inactivity
  family: 4,                         // Use IPv4, skip trying IPv6
  maxPoolSize: 10,                   // Maintain up to 10 socket connections
  minPoolSize: 2,                    // Keep at least 2 connections
  retryWrites: true,
  w: 'majority'                      // Write concern
}

const setupMongooseEventListeners = () => {
  mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB connected successfully');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('🔌 MongoDB disconnected');
  });
}
const connectDB = async () => {
  try {

    setupMongooseEventListeners();
    const conn = await mongoose.connect(process.env.MONGODB_URI, dbOptions);

    // Optional: Enable debug mode for development
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }

  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDatabase = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB disconnected successfully');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    throw error;
  }
};

// Check connection status
const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Get current database connection
const getDatabase = () => {
  return mongoose.connection;
};

// Function to clear database (useful for testing)
const clearDatabase = async () => {
  if (process.env.NODE_ENV === 'test') {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }
};

module.exports = connectDB, disconnectDatabase, isDatabaseConnected, getDatabase, clearDatabase;
