import 'dotenv/config';
// Enable async error handling
import 'express-async-errors';
import express from 'express';
import 'reflect-metadata';
import cors from 'cors';

import { router as bugRouter } from './routes/bug.route';
import { router as userRouter } from './routes/user.route';
import { router as projectRouter } from './routes/project.route';
import { AppDataSource } from './config/data-source';
import { errorHandlerMiddleware } from './middlewares/error-handler';

const app = express();

// set middleware
app.use(express.json());
app.use(cors());
app.use('/api/v1', bugRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', projectRouter);

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
