import { Enum, Type } from '../types';
import { CustomError } from './CustomError';

export class ServerConfigurationError extends CustomError {
  constructor(data: Type.CustomErrorConstructor) {
    super(data);
    this.name = 'ServerConfigurationError';
    this.message = 'Error os server configuration, check your files';
    this.httpStatusCode = Enum.HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}
