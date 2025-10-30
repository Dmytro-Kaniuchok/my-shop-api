import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productsRouter from './routes/products.js';

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Підключаємо роути
app.use('/products', productsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
