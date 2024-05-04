import { Enum, Type } from '../types';
import { CustomError } from './CustomError';

export class InvalidUuidError extends CustomError {
  constructor(data: Type.CustomErrorConstructor) {
    super(data);
    this.name = 'InvalidUuidError';
    this.message = 'Invalid uuid format';
    this.httpStatusCode = Enum.HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}
