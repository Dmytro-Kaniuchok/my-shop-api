import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productsRouter from './routes/products.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

// Маршрут для головної сторінки
app.get('/', (req, res) => {
  res.send('🛍️ My Shop API is running successfully!');
});

// Підключення до MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Підключаємо роути для товарів
app.use('/products', productsRouter);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
