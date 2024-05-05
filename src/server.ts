import 'dotenv/config';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes';
import { CustomError } from './errors/CustomError';

const server = express();
server.use(express.json());
server.use(cors());
server.use(router);

server.use((error: any, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    return response.status(error.httpStatusCode).json(error.toJson());
  }
  const customError = new CustomError({
    location: __filename,
    method: 'handle',
  });
  return response.status(customError.httpStatusCode).json(customError.toJson());
});

export { server };
