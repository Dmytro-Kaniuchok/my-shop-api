import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import { products } from './data/products.js';

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected!');

    // Очищаємо колекцію перед вставкою
    await Product.deleteMany({});
    console.log('Previous products removed');

    // Вставляємо всі товари
    await Product.insertMany(products);
    console.log('Products inserted successfully!');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
