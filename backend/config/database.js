/**
 * Database Configuration
 * 
 * This file handles MongoDB connection setup and configuration.
 * It exports a function to connect to the database.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
// This must be called before accessing process.env variables
dotenv.config();

/**
 * Connect to MongoDB database
 * This function is called from server.js
 */
export const connectDB = async () => {
  try {
    // Validate that MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined in environment variables');
      console.error('Please check your .env file and ensure MONGODB_URI is set');
      process.exit(1);
    }

    console.log('🔄 Attempting to connect to MongoDB...');
    
    // Connect to MongoDB
    // Note: useNewUrlParser and useUnifiedTopology are deprecated in mongoose 6+
    // They are no longer needed and removed to avoid warnings
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.error('Error details:', error);
    
    // Provide helpful error messages
    if (error.message.includes('ENOTFOUND')) {
      console.error('💡 Tip: Check if your MongoDB server is running or if the connection string is correct');
    } else if (error.message.includes('authentication failed')) {
      console.error('💡 Tip: Check your MongoDB username and password in the connection string');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('💡 Tip: MongoDB server is not accessible. Check if it\'s running and the port is correct');
    }
    
    process.exit(1);
  }
};
