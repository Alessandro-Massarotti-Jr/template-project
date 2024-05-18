import { Enum, Type } from '../types';
import { CustomError } from './CustomError';

export class RouteNotFoundError extends CustomError {
  constructor(data: Type.CustomErrorConstructor & { url: string }) {
    super(data);
    this.name = 'RouteNotFoundError';
    this.message = `Not found resource for: ${data.url}`;
    this.httpStatusCode = Enum.HttpStatusCode.NOT_FOUND;
  }
}
