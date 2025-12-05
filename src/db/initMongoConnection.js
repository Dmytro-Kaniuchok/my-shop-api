import mongoose from 'mongoose';

export async function initMongoConnection() {
  try {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_URL, MONGO_DB } = process.env;

    await mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}?retryWrites=true&w=majority&appName=Cluster-my-shop-api`,
    );

    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Mongo connection error:', error.message);
    process.exit(1);
  }
}
