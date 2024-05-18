import { DuplicatedPathError } from '../../errors/DuplicatedPathError';
import { InvalidUrlError } from '../../errors/InvalidUrlError';
import { RouteMethodNotAllowedError } from '../../errors/RouteMethodNotAllowedError';
import { RouteNotFoundError } from '../../errors/RouteNotFoundError';
import { Enum } from '../../types';
import { Request } from '../requests/Request';
import { router } from './Router';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Router unit test', () => {
  it('should register new paths', async () => {
    router.get('/teste', []);
    router.post('/teste/', []);
    router.connect('/teste/', []);
    router.put('teste', []);
    router.delete('teste/', []);
    router.head('/teste', []);
    router.options('/teste', []);
    router.trace('/teste', []);
    router.patch('/teste', []);
    router.get('/user', []);
    router.get('/user/:userId/', []);
    router.get('/', []);

    expect(router.getRegisteredPaths()).toEqual([
      '/ [GET]',
      '/teste [CONNECT]',
      '/teste [DELETE]',
      '/teste [GET]',
      '/teste [HEAD]',
      '/teste [OPTIONS]',
      '/teste [PATCH]',
      '/teste [POST]',
      '/teste [PUT]',
      '/teste [TRACE]',
      '/user [GET]',
      '/user/{param} [GET]',
    ]);
  });

  it('should not register duplicated path', async () => {
    try {
      router.get('/teste', []);
      router.get('/teste', []);
    } catch (error) {
      expect(error).toBeInstanceOf(DuplicatedPathError);
    }
  });

  it('should handle response', async () => {
    router.get('/request', [
      (request: Request) => {
        request.setResponse({
          data: {},
          httpStatusCode: Enum.HttpStatusCode.CREATED,
          message: 'Success',
        });
      },
    ]);

    const reponse = await router.handleRequest({
      method: Enum.HttpMethod.GET,
      url: 'http://localhost:3000/request',
      body: {},
      headers: {},
    });

    expect(reponse).toEqual({
      data: {},
      httpStatusCode: Enum.HttpStatusCode.CREATED,
      message: 'Success',
    });
  });

  it('should not process possible fake url', async () => {
    try {
      await router.handleRequest({
        method: Enum.HttpMethod.GET,
        url: 'http://localhost:3000/request/:teste',
        body: {},
        headers: {},
      });
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidUrlError);
    }
  });

  it('should throw route not found error', async () => {
    try {
      await router.handleRequest({
        method: Enum.HttpMethod.GET,
        url: 'http://localhost:3000/request/teste',
        body: {},
        headers: {},
      });
    } catch (error) {
      expect(error).toBeInstanceOf(RouteNotFoundError);
    }
  });
  it('should throw method not allowed error', async () => {
    try {
      await router.handleRequest({
        method: Enum.HttpMethod.POST,
        url: 'http://localhost:3000/request',
        body: {},
        headers: {},
      });
    } catch (error) {
      expect(error).toBeInstanceOf(RouteMethodNotAllowedError);
    }
  });

  it('should handle response with params', async () => {
    router.get('/user/:userId/products', [
      (request: Request) => {
        request.setResponse({
          data: {
            title: 'cellphone',
          },
          httpStatusCode: Enum.HttpStatusCode.OK,
          message: 'Success',
        });
      },
    ]);

    const reponse = await router.handleRequest({
      method: Enum.HttpMethod.GET,
      url: 'http://localhost:3000/user/teste/products',
      body: {},
      headers: {},
    });

    expect(reponse).toEqual({
      data: {
        title: 'cellphone',
      },
      httpStatusCode: Enum.HttpStatusCode.OK,
      message: 'Success',
    });
  });
});
