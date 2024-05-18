import 'dotenv/config';
import { Router } from './http/routes/Router';
import { Request } from './http/requests/Request';
import { Enum } from './types';
import { ExpressHttpServer } from './http/server/implementations/ExpressHttpServer';

const router = Router.getInstance();
router.get('/', [
  (request: Request) => {
    request.setResponse({
      data: {},
      httpStatusCode: Enum.HttpStatusCode.OK,
      message: 'Running...',
    });
  },
]);

router.post('/user/:uid/product/:productId', [
  (request: Request) => {
    request.setResponse({
      data: { ...request.getBody(), ...request.getPathParams(), ...request.getQueryParams() },
      httpStatusCode: Enum.HttpStatusCode.OK,
      message: 'teste',
    });
  },
]);

const server = new ExpressHttpServer();
server.setRouter(router);
export { server };
