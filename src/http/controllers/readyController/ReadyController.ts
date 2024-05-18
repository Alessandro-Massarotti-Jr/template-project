import { Enum } from '../../../types';
import { ReadyUseCase } from '../../../useCases/readyUseCase/ReadyUseCase';
import { Request } from '../../infrastructure/Request/Request';
import { IHttpHandler } from '../../interfaces/IHttpHandler';

export class ReadyController implements IHttpHandler {
  constructor(private readyUseCase: ReadyUseCase) {
    this.handle = this.handle.bind(this);
  }

  public async handle(request: Request): Promise<void> {
    const data = await this.readyUseCase.execute();
    request.setResponse({
      httpStatusCode: Enum.HttpStatusCode.OK,
      message: 'Ready!',
      data,
    });
  }
}
