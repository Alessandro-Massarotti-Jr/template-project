import { ExpressHttpServer } from './ExpressHttpServer';
import { Router } from '../../routes/Router';
import request from 'supertest';
import { Enum } from '../../../types';
import { Request } from '../../requests/Request';
import { ServerConfigurationError } from '../../../errors/ServerConfigurationError';

describe('ExpressHttpServer unit test', () => {
  it('should handle a request and send a response', async () => {
    const server = new ExpressHttpServer();
    const router = Router.getInstance() as jest.Mocked<Router>;

    const spyHandleRequest = jest.spyOn(router, 'handleRequest');

    router.get('/express-test', [
      (request: Request) => {
        request.setResponse({
          httpStatusCode: Enum.HttpStatusCode.OK,
          message: 'success',
          data: { key: 'value' },
        });
      },
    ]);

    router.post('/express-test', [
      (request: Request) => {
        request.setResponse({
          httpStatusCode: Enum.HttpStatusCode.OK,
          message: 'success',
          data: { key: 'value' },
        });
      },
    ]);

    server.setRouter(router);
    server.listen(3003, () => {
      return;
    });
    await request(server.getServerInstance()).get('/express-test?search=teste');
    await request(server.getServerInstance()).post('/express-test').send({ teste: 'teste' });
    server.close();

    expect(spyHandleRequest).toHaveBeenCalledWith({
      url: 'http://127.0.0.1:3003/express-test?search=teste',
      body: {},
      headers: expect.any(Object),
      method: Enum.HttpMethod.GET,
    });

    expect(spyHandleRequest).toHaveBeenCalledWith({
      url: 'http://127.0.0.1:3003/express-test',
      body: { teste: 'teste' },
      headers: expect.any(Object),
      method: Enum.HttpMethod.POST,
    });
  });

  it('should handle a request errors and send a response', async () => {
    const server = new ExpressHttpServer();
    const router = Router.getInstance() as jest.Mocked<Router>;

    const spyHandleRequest = jest.spyOn(router, 'handleRequest');
    router.get('/express-test-error', [
      () => {
        throw new Error('teste');
      },
    ]);
    server.setRouter(router);
    server.listen(3004, () => {
      return;
    });
    await request(server.getServerInstance()).get('/express-test-error');
    server.close();
    expect(spyHandleRequest).toHaveBeenCalledWith({
      url: 'http://127.0.0.1:3004/express-test-error',
      body: {},
      headers: expect.any(Object),
      method: Enum.HttpMethod.GET,
    });
  });

  it('should handle a no router errors and send a response', async () => {
    const server = new ExpressHttpServer();
    const router = Router.getInstance();
    const spyHandleRequest = jest.spyOn(router, 'handleRequest');
    server.listen(3005, () => {
      return;
    });
    await request(server.getServerInstance()).get('/express-test-error');
    server.close();
    expect(spyHandleRequest).not.toHaveBeenCalled();
  });

  it('should throw a error when try to get server instance without start a listener', async () => {
    const server = new ExpressHttpServer();
    try {
      server.getServerInstance();
    } catch (error) {
      expect(error).toBeInstanceOf(ServerConfigurationError);
    }
  });
});
