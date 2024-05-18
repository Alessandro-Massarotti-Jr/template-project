import { Enum, Type } from '../types';
import { CustomError } from './CustomError';

export class InvalidUrlError extends CustomError {
  constructor(data: Type.CustomErrorConstructor & { url: string }) {
    super(data);
    this.name = 'InvalidUrlError';
    this.message = `Invalid url: ${data.url}`;
    this.httpStatusCode = Enum.HttpStatusCode.FORBIDDEN;
  }
}
