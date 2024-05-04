import { CustomError } from '../../../errors/CustomError';
import { Enum, Type } from '../../../types';

export class FindProductError extends CustomError {
  constructor(data: Type.CustomErrorConstructor) {
    super(data);
    this.name = 'FindProductError';
    this.message = 'Error search product on database';
    this.httpStatusCode = Enum.HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}
