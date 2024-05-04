import { CustomError } from '../../../errors/CustomError';
import { Enum, Type } from '../../../types';

export class UpdateProductError extends CustomError {
  constructor(data: Type.CustomErrorConstructor) {
    super(data);
    this.name = 'UpdateProductError';
    this.message = 'Error updating product on database';
    this.httpStatusCode = Enum.HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}
