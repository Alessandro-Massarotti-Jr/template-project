import 'dotenv/config';
import { NodeHttpServer } from './http/server/implementations/NodeHttpServer';
import { Router } from './http/routes/Router';
import { Request } from './http/requests/Request';
import { Enum } from './types';

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

const server = new NodeHttpServer();
server.setRouter(router);
export { server };
