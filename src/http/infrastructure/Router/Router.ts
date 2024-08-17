import { DuplicatedPathError } from '../../../errors/DuplicatedPathError';
import { InvalidUrlError } from '../../../errors/InvalidUrlError';
import { RouteMethodNotAllowedError } from '../../../errors/RouteMethodNotAllowedError';
import { RouteNotFoundError } from '../../../errors/RouteNotFoundError';
import { Enum } from '../../../types';
import { logger } from '../../../utilities/Logger';
import { RequestHandler } from '../../interfaces/IHttpHandler';
import { Body, Headers, Request, Response } from '../Request/Request';
import { Route } from '../Route/Route';

type HandleRequestDTO = {
  method: Enum.HttpMethod;
  url: string;
  body: Body;
  headers: Headers;
};

export class Router {
  // eslint-disable-next-line no-use-before-define
  private static instance: Router;
  private routes: Route[] = [];
  private registeredPaths: string[] = [];

  private constructor() {
    logger.info({
      message: 'Router initializing',
    });
  }

  public static getInstance(): Router {
    if (!this.instance) {
      this.instance = new Router();
    }
    return this.instance;
  }

  private addRoute(method: Enum.HttpMethod, path: string, callbacks: RequestHandler[]) {
    const parsedPath = this.parsePath(path);
    const genericPath = this.sanitazePathParams(parsedPath);
    if (this.registeredPaths.includes(`${genericPath} [${method}]`)) {
      throw new DuplicatedPathError({
        location: __filename,
        method: 'addRoute',
        routePath: parsedPath,
      });
    }
    const route = new Route(parsedPath);
    route.setEndPoint(method, callbacks);
    this.routes.push(route);
    this.registeredPaths.push(`${genericPath} [${method}]`);
  }

  private parsePath(path: string): string {
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }
    return path;
  }

  private sanitazePathParams(path: string): string {
    return path.replace(/:\w+/g, '{param}');
  }

  public all(path: string, callbacks: RequestHandler[]) {
    for (const method in Enum.HttpMethod) {
      this.addRoute(method as Enum.HttpMethod, path, callbacks);
    }
  }

  public get(path: string, callbacks: RequestHandler[]) {
    this.addRoute(Enum.HttpMethod.GET, path, callbacks);
  }

  public post(path: string, callbacks: RequestHandler[]) {
    this.addRoute(Enum.HttpMethod.POST, path, callbacks);
  }

  public put(path: string, callbacks: RequestHandler[]) {
    this.addRoute(Enum.HttpMethod.PUT, path, callbacks);
  }
  public delete(path: string, callbacks: RequestHandler[]) {
    this.addRoute(Enum.HttpMethod.DELETE, path, callbacks);
  }

  public patch(path: string, callbacks: RequestHandler[]) {
    this.addRoute(Enum.HttpMethod.PATCH, path, callbacks);
  }

  public options(path: string, callbacks: RequestHandler[]) {
    this.addRoute(Enum.HttpMethod.OPTIONS, path, callbacks);
  }

  public head(path: string, callbacks: RequestHandler[]) {
    this.addRoute(Enum.HttpMethod.HEAD, path, callbacks);
  }

  public connect(path: string, callbacks: RequestHandler[]) {
    this.addRoute(Enum.HttpMethod.CONNECT, path, callbacks);
  }

  public trace(path: string, callbacks: RequestHandler[]) {
    this.addRoute(Enum.HttpMethod.TRACE, path, callbacks);
  }

  private getRouteByUrl(requestUrl: string): Route | null {
    const parsedUrl = new URL(requestUrl);
    const requestPath = parsedUrl.pathname;
    const invalidRouterRegex = /\/:/g;
    const requestUrlHasPossibleParam = invalidRouterRegex.test(requestPath);
    if (requestUrlHasPossibleParam) {
      throw new InvalidUrlError({
        location: __filename,
        method: 'getRouteByUrl',
        url: requestUrl,
      });
    }
    let currentRoute = this.routes.find((route) => route.getPath() === requestPath);
    if (currentRoute) {
      return currentRoute;
    }
    const urlParts = requestPath.split('/');
    for (const route of this.routes) {
      const routePathParts = route.getPath().split('/');
      if (routePathParts.length !== urlParts.length) {
        continue;
      }
      let isMatch = true;
      for (let i = 0; i < routePathParts.length; i++) {
        if (routePathParts[i].startsWith(':')) {
          continue;
        }
        if (routePathParts[i] !== urlParts[i]) {
          isMatch = false;
          break;
        }
      }
      if (isMatch) {
        currentRoute = route;
        break;
      }
    }

    return currentRoute || null;
  }

  public async handleRequest(data: HandleRequestDTO): Promise<Response> {
    const currentRoute = this.getRouteByUrl(data.url);
    if (!currentRoute) {
      throw new RouteNotFoundError({
        location: __filename,
        method: 'handleRequest',
        url: data.url,
      });
    }
    if (!currentRoute.hasMethod(data.method)) {
      throw new RouteMethodNotAllowedError({
        location: __filename,
        method: 'handleRequest',
        url: data.url,
        httpMethod: data.method,
        availableHttpMethods: currentRoute.getAvailableMethods(),
      });
    }

    const response = await currentRoute.handleRequest(
      data.method,
      new Request({
        body: data.body,
        headers: data.headers,
        url: data.url,
        path: currentRoute.getPath(),
      }),
    );

    return response;
  }

  public getRegisteredPaths(): string[] {
    return this.registeredPaths.sort((a: string, b: string) => a.localeCompare(b));
  }
}
