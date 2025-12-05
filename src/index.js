import dotenv from 'dotenv';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

dotenv.config();

async function bootstrap() {
  try {
    await initMongoConnection();
    setupServer();
  } catch (err) {
    console.error('Bootstrap error:', err.message);
    process.exit(1);
  }
}

bootstrap();
