import { Enum, Type } from '../types';
import { CustomError } from './CustomError';

export class RouteMethodNotAllowedError extends CustomError {
  constructor(
    data: Type.CustomErrorConstructor & {
      url: string;
      httpMethod: Enum.HttpMethod;
      availableHttpMethods: Enum.HttpMethod[];
    },
  ) {
    super(data);
    this.name = 'RouteMethodNotAllowedError';
    this.message = `Method [${data.httpMethod}] was not allowed for: ${data.url} you should try: ${JSON.stringify(data.availableHttpMethods)}`;
    this.httpStatusCode = Enum.HttpStatusCode.METHOD_NOT_ALLOWED;
  }
}
