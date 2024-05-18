import * as http from 'http';
import { IServer } from '../interfaces/IServer';
import { CustomError } from '../../../errors/CustomError';
import { Enum } from '../../../types';
import { Router } from '../../routes/Router';
import { logger } from '../../../utilities/Logger';

export class NodeHttpServer implements IServer {
  private server: http.Server;
  private router?: Router;

  constructor() {
    this.server = http.createServer((req, res) => {
      let bodyData = '';
      req.on('data', (chunk) => {
        bodyData += chunk;
      });
      req.on('end', async () => {
        try {
          if (!this.router) {
            throw new Error('');
          }

          const response = await this.router.handleRequest({
            url: `http://${req.headers.host}${req.url}`,
            body: bodyData ? JSON.parse(bodyData) : {},
            headers: req.headers as any,
            method: req.method as Enum.HttpMethod,
          });
          res.writeHead(response.httpStatusCode, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              message: response.message,
              data: response.data,
            }),
          );
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
          res.writeHead(errorToThrow.httpStatusCode, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(errorToThrow.toJson()));
        }
      });
    });
  }

  setRouter(router: Router): void {
    this.router = router;
  }
  listen(port: number, callback: () => void): void {
    this.server.listen(port, callback);
  }
}
