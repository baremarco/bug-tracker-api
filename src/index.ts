import 'dotenv/config';
// Enable async error handling
import 'express-async-errors';
import express from 'express';
import 'reflect-metadata';

import { router as bugRouter } from './routes/bug.route';
import { AppDataSource } from './config/data-source';
import { errorHandlerMiddleware } from './middlewares/error-handler';

const app = express();

// set middleware
app.use(express.json());
app.use('/api/v1', bugRouter);

// set error handler
app.use(errorHandlerMiddleware);
const port = process.env.PORT ?? 3000;

const start = async () => {
  try {
    await AppDataSource.initialize();
    console.log('success DB Connection');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

void start();
