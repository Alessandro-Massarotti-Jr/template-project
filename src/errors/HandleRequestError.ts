import { Enum, Type } from '../types';
import { CustomError } from './CustomError';

export class HandleRequestError extends CustomError {
  constructor(
    data: Type.CustomErrorConstructor & {
      url: string;
      httpMethod: Enum.HttpMethod;
    },
  ) {
    super(data);
    this.name = 'HandleRequestError';
    this.message = `Unxpected error when handling [${data.httpMethod}] ${data.url}`;
    this.httpStatusCode = Enum.HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}
