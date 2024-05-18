import { HandleRequestError } from '../../../errors/HandleRequestError';
import { Enum } from '../../../types';
import { RequestHandler } from '../../interfaces/IHttpHandler';
import { Request, Response } from '../Request/Request';

export class Route {
  private path: string = '';
  private allowedMethods: Enum.HttpMethod[] = [];
  private methodsFunctions: {
    // eslint-disable-next-line no-unused-vars
    [key in Enum.HttpMethod]?: RequestHandler[];
  } = {};

  constructor(path: string) {
    this.setPath(path);
  }

  private setPath(rawPath: string): void {
    if (rawPath.endsWith('/')) {
      rawPath = rawPath.slice(0, -1);
    }
    if (!rawPath.startsWith('/')) {
      rawPath = `/${rawPath}`;
    }

    this.path = rawPath;
  }

  public setEndPoint(method: Enum.HttpMethod, callbacks: RequestHandler[]): void {
    if (!this.allowedMethods.includes(method)) {
      this.allowedMethods.push(method);
    }
    this.methodsFunctions[method] = callbacks;
  }

  public getPath(): string {
    return this.path;
  }

  public getAvailableMethods(): Enum.HttpMethod[] {
    return this.allowedMethods;
  }

  public hasMethod(method: Enum.HttpMethod): boolean {
    return this.allowedMethods.includes(method);
  }

  public async handleRequest(method: Enum.HttpMethod, request: Request): Promise<Response> {
    const callbacks = this.methodsFunctions[method];
    if (callbacks) {
      for (const callback of callbacks) {
        await callback(request);
        if (request.hasReponse()) {
          return request.getResponse()!;
        }
      }
    }
    throw new HandleRequestError({
      location: __filename,
      method: 'handleRequest',
      httpMethod: method,
      url: this.path,
    });
  }
}
