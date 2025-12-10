import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      const msg = '\n❌ Error: MONGODB_URI is not defined in .env file\nPlease add MONGODB_URI to your server/.env file\nExample: MONGODB_URI=mongodb://localhost:27017/thedaynews';
      console.error(msg);
      throw new Error('MONGODB_URI is not defined in .env file');
    }

    // Connect with better error handling
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`\n❌ MongoDB Connection Error: ${error.message}`);
    
    // Provide helpful error messages based on error type
    if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
      console.error('\n⚠️  Authentication failed. Solutions:');
      console.error('   1. For LOCAL MongoDB (no auth):');
      console.error('      MONGODB_URI=mongodb://localhost:27017/thedaynews');
      console.error('');
      console.error('   2. For MongoDB Atlas (with auth):');
      console.error('      MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thedaynews');
      console.error('      Make sure username and password are correct');
      console.error('');
      console.error('   3. Check if MongoDB is running:');
      console.error('      - Windows: Check Services for MongoDB');
      console.error('      - Or run: mongod');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('\n⚠️  Cannot connect to MongoDB. Please check:');
      console.error('   1. MongoDB service is running');
      console.error('   2. MongoDB is accessible on the specified host/port');
      console.error('   3. Check your MONGODB_URI in .env file');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('\n⚠️  MongoDB host not found. Please check:');
      console.error('   1. Your MONGODB_URI hostname is correct');
      console.error('   2. Internet connection (for MongoDB Atlas)');
    }
    
    console.error('\n📖 See MONGODB_SETUP.md for detailed setup instructions\n');
    throw error;
  }
};

export default connectDB;

