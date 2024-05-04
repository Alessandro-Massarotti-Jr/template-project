import { CustomError } from '../../../errors/CustomError';
import { Enum, Type } from '../../../types';

export class CreateProductError extends CustomError {
  constructor(data: Type.CustomErrorConstructor) {
    super(data);
    this.name = 'CreateProductError';
    this.message = 'Error when creating product on database';
    this.httpStatusCode = Enum.HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}
