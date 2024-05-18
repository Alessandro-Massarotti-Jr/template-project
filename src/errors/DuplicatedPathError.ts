import { Enum, Type } from '../types';
import { CustomError } from './CustomError';

export class DuplicatedPathError extends CustomError {
  constructor(data: Type.CustomErrorConstructor & { routePath: string }) {
    super(data);
    this.name = 'DuplicatedPathError';
    this.message = `Duplicate route path ${data.routePath}`;
    this.httpStatusCode = Enum.HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}
