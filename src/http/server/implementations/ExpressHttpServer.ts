import * as http from 'http';
import express, { Request, Response, Express } from 'express';
import { IServer } from '../interfaces/IServer';
import { CustomError } from '../../../errors/CustomError';
import { Enum } from '../../../types';
import { Router } from '../../infrastructure/Router/Router';
import { logger } from '../../../utilities/Logger';
import { ServerConfigurationError } from '../../../errors/ServerConfigurationError';

export class ExpressHttpServer implements IServer {
  private app: Express;
  private router?: Router;
  private server?: http.Server;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(async (req: Request, res: Response) => {
      try {
        if (!this.router) {
          throw new ServerConfigurationError({
            location: __filename,
            method: 'constructor',
          });
        }
        const response = await this.router.handleRequest({
          url: `http://${req.headers.host}${req.url}`,
          body: req.body,
          headers: req.headers as any,
          method: req.method as Enum.HttpMethod,
        });

        res.status(response.httpStatusCode).json({
          message: response.message,
          data: response.data,
        });
      } catch (error: any) {
        let errorToThrow: any = error;
        if (!(error instanceof CustomError)) {
          errorToThrow = new CustomError({
            location: __filename,
            method: 'handleRequest',
          });
        }
        if (!errorToThrow.isIgnorable) {
          logger.error({
            message: error.message,
          });
        }
        res.status(errorToThrow.httpStatusCode).json(errorToThrow.toJson());
      }
    });
  }

  setRouter(router: Router): void {
    this.router = router;
  }
  listen(port: number, callback: () => void): void {
    this.server = this.app.listen(port, callback);
  }

  close() {
    if (this.server) {
      this.server.close(() => {
        logger.http({
          message: 'Closing server...',
        });
      });
    }
  }

  getServerInstance(): http.Server {
    if (this.server) {
      return this.server;
    }
    throw new ServerConfigurationError({
      location: __filename,
      method: 'getServerInstance',
    });
  }
}
