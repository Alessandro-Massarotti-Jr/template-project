import { Request } from '../infrastructure/Request/Request';

export type RequestHandler = (request: Request) => Promise<void>;

export interface IHttpHandler {
  handle: RequestHandler;
}
