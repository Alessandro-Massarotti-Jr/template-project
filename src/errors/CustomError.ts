import { Enum, Type } from '../types';

export class CustomError extends Error {
  public name: string;
  public location: string;
  public message: string;
  public method: string;
  public httpStatusCode: Enum.HttpStatusCode;

  constructor({ location, method }: Type.CustomErrorConstructor) {
    super();
    this.name = 'CustomError';
    this.message = 'Internal server error';
    this.httpStatusCode = Enum.HttpStatusCode.INTERNAL_SERVER_ERROR;
    this.location = location;
    this.method = method;
  }

  public toJson() {
    return {
      error: {
        name: this.name,
        message: this.message,
      },
    };
  }

  public getStatusCode(): Enum.HttpStatusCode {
    return this.httpStatusCode;
  }

  public getStack() {
    return this.stack;
  }
}
