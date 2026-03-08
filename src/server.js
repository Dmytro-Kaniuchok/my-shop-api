import express from 'express';
import cors from 'cors';

import productsRouter from './routes/productsRoutes.js';
import rateRouter from './routes/rateRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';

import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

const PORT = process.env.PORT || 5000;

export function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('AutoAgro Parts API is running!');
  });

  // Роути
  app.use('/products', productsRouter);
  app.use('/rate', rateRouter);
  app.use('/reviews', reviewRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
