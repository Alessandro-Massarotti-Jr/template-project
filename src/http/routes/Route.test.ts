import { HandleRequestError } from '../../errors/HandleRequestError';
import { Enum } from '../../types';
import { Request } from '../requests/Request';
import { Route } from './Route';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Route unit test', () => {
  it('should always set a correct path', async () => {
    const route1 = new Route('/teste');
    const route2 = new Route('/teste/');
    const route3 = new Route('teste/');
    const route4 = new Route('/');
    const route5 = new Route('');
    const route6 = new Route('teste');

    expect(route1.getPath()).toEqual('/teste');
    expect(route2.getPath()).toEqual('/teste');
    expect(route3.getPath()).toEqual('/teste');
    expect(route4.getPath()).toEqual('/');
    expect(route5.getPath()).toEqual('/');
    expect(route6.getPath()).toEqual('/teste');
  });

  it('should be possible to set endpoints', async () => {
    const route1 = new Route('/teste');
    route1.setEndPoint(Enum.HttpMethod.GET, []);

    const route2 = new Route('/teste');
    route2.setEndPoint(Enum.HttpMethod.GET, []);
    route2.setEndPoint(Enum.HttpMethod.POST, [
      () => {
        return;
      },
    ]);

    const route3 = new Route('/teste');
    route3.setEndPoint(Enum.HttpMethod.GET, [
      () => {
        return;
      },
    ]);
    route3.setEndPoint(Enum.HttpMethod.GET, []);

    expect(route1.getAvailableMethods()).toEqual(['GET']);
    expect(route1.hasMethod(Enum.HttpMethod.GET)).toEqual(true);
    expect(route1.hasMethod(Enum.HttpMethod.POST)).toEqual(false);

    expect(route2.getAvailableMethods()).toEqual(['GET', 'POST']);
    expect(route2.hasMethod(Enum.HttpMethod.GET)).toEqual(true);
    expect(route2.hasMethod(Enum.HttpMethod.POST)).toEqual(true);

    expect(route3.getAvailableMethods()).toEqual(['GET']);
    expect(route3.hasMethod(Enum.HttpMethod.GET)).toEqual(true);
    expect(route3.hasMethod(Enum.HttpMethod.POST)).toEqual(false);
  });

  it('should call functions', async () => {
    const sampleFunction1 = jest.fn().mockImplementation(() => {
      return;
    });
    const sampleFunction2 = jest.fn().mockImplementation((request: Request) => {
      request.setResponse({
        data: {},
        httpStatusCode: Enum.HttpStatusCode.OK,
        message: 'Test works',
      });
    });
    const sampleFunction3 = jest.fn().mockImplementation(() => {
      return;
    });

    const route1 = new Route('/teste');
    route1.setEndPoint(Enum.HttpMethod.GET, [sampleFunction1]);

    const route2 = new Route('/teste');
    route2.setEndPoint(Enum.HttpMethod.GET, [sampleFunction1, sampleFunction2, sampleFunction3]);

    const sampleRequest1 = new Request({
      body: {},
      path: '/teste',
      url: 'http://localhost:3000/teste',
      headers: {},
    });

    const sampleRequest2 = new Request({
      body: {},
      path: '/teste',
      url: 'http://localhost:3000/teste',
      headers: {},
    });

    try {
      await route1.handleRequest(Enum.HttpMethod.GET, sampleRequest1);
    } catch (error) {
      expect(error).toBeInstanceOf(HandleRequestError);
    }

    const rote2Result = await route2.handleRequest(Enum.HttpMethod.GET, sampleRequest2);

    expect(rote2Result).toEqual({
      data: {},
      httpStatusCode: Enum.HttpStatusCode.OK,
      message: 'Test works',
    });

    expect(sampleFunction1).toHaveBeenCalledTimes(2);
    expect(sampleFunction2).toHaveBeenCalledTimes(1);
    expect(sampleFunction3).not.toHaveBeenCalled();
  });

  it('should throw a error when for any reason route not have functions', async () => {
    const route1 = new Route('/teste');
    route1.setEndPoint(Enum.HttpMethod.POST, []);

    const sampleRequest1 = new Request({
      body: {},
      path: '/teste',
      url: 'http://localhost:3000/teste',
      headers: {},
    });

    try {
      await route1.handleRequest(Enum.HttpMethod.GET, sampleRequest1);
    } catch (error) {
      expect(error).toBeInstanceOf(HandleRequestError);
    }
  });
});
