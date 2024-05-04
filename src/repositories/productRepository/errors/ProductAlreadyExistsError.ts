import { CustomError } from '../../../errors/CustomError';
import { Enum, Type } from '../../../types';

export class ProductAlreadyExistsError extends CustomError {
  constructor(data: Type.CustomErrorConstructor) {
    super(data);
    this.name = 'ProductAlreadyExistsError';
    this.message = 'Product Already exists on database';
    this.httpStatusCode = Enum.HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}
