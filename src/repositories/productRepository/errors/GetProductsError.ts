import { CustomError } from '../../../errors/CustomError';
import { Enum, Type } from '../../../types';

export class GetProductsError extends CustomError {
  constructor(data: Type.CustomErrorConstructor) {
    super(data);
    this.name = 'GetProductsError';
    this.message = 'Error searching products on database';
    this.httpStatusCode = Enum.HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}
