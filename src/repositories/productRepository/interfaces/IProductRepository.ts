import {
  CreateDTO,
  CreateReturnDTO,
  DeleteDTO,
  DeleteReturnDTO,
  FindByIdDTO,
  FindByIdReturnDTO,
  GetAllReturnDTO,
  UpdateDTO,
  UpdateReturnDTO,
} from '../dtos/ProductRepositoryDTOs';

export interface IProductRepository {
  create(data: CreateDTO): CreateReturnDTO;
  findById(data: FindByIdDTO): FindByIdReturnDTO;
  update(data: UpdateDTO): UpdateReturnDTO;
  delete(data: DeleteDTO): DeleteReturnDTO;
  getAll(): GetAllReturnDTO;
}
