import { NodeHttpServer } from './NodeHttpServer';
import { Router } from '../../routes/Router';
import request from 'supertest';
import { Enum } from '../../../types';
import { Request } from '../../requests/Request';

describe('NodeHttpServer unit test', () => {
  it('should handle a request and send a response', async () => {
    const server = new NodeHttpServer();
    const router = Router.getInstance() as jest.Mocked<Router>;

    const spyHandleRequest = jest.spyOn(router, 'handleRequest');

    router.get('/node-test', [
      (request: Request) => {
        request.setResponse({
          httpStatusCode: Enum.HttpStatusCode.OK,
          message: 'success',
          data: { key: 'value' },
        });
      },
    ]);

    router.post('/node-test', [
      (request: Request) => {
        request.setResponse({
          httpStatusCode: Enum.HttpStatusCode.OK,
          message: 'success',
          data: { key: 'value' },
        });
      },
    ]);

    server.setRouter(router);
    server.listen(3000, () => {
      return;
    });
    await request(server.getServerInstance()).get('/node-test?search=teste');
    await request(server.getServerInstance()).post('/node-test').send({ teste: 'teste' });
    server.close();

    expect(spyHandleRequest).toHaveBeenCalledWith({
      url: 'http://127.0.0.1:3000/node-test?search=teste',
      body: {},
      headers: expect.any(Object),
      method: Enum.HttpMethod.GET,
    });

    expect(spyHandleRequest).toHaveBeenCalledWith({
      url: 'http://127.0.0.1:3000/node-test',
      body: { teste: 'teste' },
      headers: expect.any(Object),
      method: Enum.HttpMethod.POST,
    });
  });

  it('should handle a request errors and send a response', async () => {
    const server = new NodeHttpServer();
    const router = Router.getInstance() as jest.Mocked<Router>;

    const spyHandleRequest = jest.spyOn(router, 'handleRequest');
    router.get('/node-test-error', [
      () => {
        throw new Error('teste');
      },
    ]);
    server.setRouter(router);
    server.listen(3001, () => {
      return;
    });
    await request(server.getServerInstance()).get('/node-test-error');
    server.close();
    expect(spyHandleRequest).toHaveBeenCalledWith({
      url: 'http://127.0.0.1:3000/node-test-error',
      body: {},
      headers: expect.any(Object),
      method: Enum.HttpMethod.GET,
    });
  });

  it('should handle a no router errors and send a response', async () => {
    const server = new NodeHttpServer();
    const router = Router.getInstance();
    const spyHandleRequest = jest.spyOn(router, 'handleRequest');
    server.listen(3002, () => {
      return;
    });
    await request(server.getServerInstance()).get('/node-test-error');
    server.close();
    expect(spyHandleRequest).not.toHaveBeenCalled();
  });
});
