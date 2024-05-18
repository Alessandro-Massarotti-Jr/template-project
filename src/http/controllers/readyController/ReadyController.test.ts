import { Enum } from '../../../types';
import { ReadyUseCase } from '../../../useCases/readyUseCase/ReadyUseCase';
import { Request } from '../../infrastructure/Request/Request';
import { ReadyController } from './ReadyController';

const readyUseCase = new ReadyUseCase();
const readyController = new ReadyController(readyUseCase);

describe('ReadyController unit test', () => {
  it('should processe request', async () => {
    const sampleRequest = new Request({
      body: {},
      headers: {},
      path: '/',
      url: 'http://localhost:3000',
    });

    await readyController.handle(sampleRequest);
    expect(sampleRequest.getResponse()).toEqual({
      httpStatusCode: Enum.HttpStatusCode.OK,
      message: 'Ready!',
      data: {},
    });
  });
});
