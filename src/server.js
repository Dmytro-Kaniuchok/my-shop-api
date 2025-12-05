import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';

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

  app.use('/products', productsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
