import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import { products } from './data/products.js';

dotenv.config();

const seedDB = async () => {
  try {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_URL, MONGO_DB } = process.env;
    await mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}?retryWrites=true&w=majority`,
    );
    console.log('MongoDB connected!');

    for (const prod of products) {
      // Підставляємо робоче зображення
      const imageUrl = `https://picsum.photos/800/600?random=${Math.floor(
        Math.random() * 1000,
      )}`;

      await Product.findOneAndUpdate(
        { id: prod.id },
        { $set: { ...prod, image: imageUrl } },
        { upsert: true },
      );
    }

    console.log('Products updated/inserted with images successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
