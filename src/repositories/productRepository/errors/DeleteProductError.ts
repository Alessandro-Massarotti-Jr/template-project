import { CustomError } from '../../../errors/CustomError';
import { Enum, Type } from '../../../types';

export class DeleteProductError extends CustomError {
  constructor(data: Type.CustomErrorConstructor) {
    super(data);
    this.name = 'DeleteProductError';
    this.message = 'Error deleting product on database';
    this.httpStatusCode = Enum.HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}
