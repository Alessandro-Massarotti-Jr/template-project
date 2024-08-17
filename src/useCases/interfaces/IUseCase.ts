type UseCaseReturn<T = any> = Promise<T>;
type UseCaseDTO<T = Object> = T;

export interface IUseCase {
  execute(data?: UseCaseDTO): UseCaseReturn;
}
