type UseCaseReturn<T = any> = Promise<T | any>;
type UseCaseDTO<T = Object> = T | any;

export interface IUseCase {
  execute(data?: UseCaseDTO): UseCaseReturn;
}
