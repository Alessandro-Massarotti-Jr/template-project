import 'dotenv/config';
import { ExpressHttpServer } from './http/server/implementations/ExpressHttpServer';
import { router } from './http/routes';

const server = new ExpressHttpServer();
server.setRouter(router);
export { server };
