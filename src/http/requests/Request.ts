import { Enum } from '../../types';

export type QueryParams = {
  [key: string]: string | string[];
};

export type PathParams = {
  [key: string]: string;
};

export type Body = {
  [key: string]: any;
};

export type Headers = {
  [key: string]: string;
};

export type RequetDTO = {
  url: string | URL;
  path: string;
  body: Body;
  headers: Headers;
};

export type Response = {
  httpStatusCode: Enum.HttpStatusCode;
  message?: string;
  data: any;
};

export class Request {
  private queryParams: QueryParams = {};
  private pathParams: PathParams = {};
  private body: Body = {};
  private headers: Headers = {};
  private response?: Response;

  constructor(data: RequetDTO) {
    this.setBody(data.body);
    this.setHeaders(data.headers);
    this.setQueryParams(new URL(data.url));
    this.setPathParams(new URL(data.url), data.path);
  }

  private setBody(body: Body) {
    this.body = body;
  }

  private setHeaders(headers: Headers) {
    this.headers = headers;
  }

  private setQueryParams(url: URL) {
    for (const [key, value] of url.searchParams) {
      if (this.queryParams[key]) {
        if (!Array.isArray(this.queryParams[key])) {
          this.queryParams[key] = [this.queryParams[key] as string, value];
          continue;
        }
        this.queryParams[key] = [...this.queryParams[key], value];
        continue;
      }
      this.queryParams[key] = value;
    }
  }

  private setPathParams(url: URL, path: string) {
    const pathParts = path.split('/');
    const urlParts = url.pathname.split('/');
    for (let i = 0; i < pathParts.length; i++) {
      if (pathParts[i].startsWith(':')) {
        const paramName = pathParts[i].slice(1);
        this.pathParams[paramName] = urlParts[i];
      }
    }
  }

  public getBody(): Body {
    return this.body;
  }

  public getHeaders(): Headers {
    return this.headers;
  }

  public getQueryParams(): QueryParams {
    return this.queryParams;
  }

  public getPathParams(): PathParams {
    return this.pathParams;
  }

  public hasReponse(): boolean {
    return !!this.response;
  }

  public getResponse(): Response | undefined {
    return this.response;
  }

  public setResponse(response: Response): void {
    this.response = response;
  }
}
