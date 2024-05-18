import { Request } from './Request';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Request unit test', () => {
  it('should parse request data', async () => {
    const request = new Request({
      body: {
        teste: 'teste',
      },
      url: 'http://localhost:3000/teste/usuario/teste/produto?teste=123&search=teste&search=res&search=aaa',
      path: '/teste/:userId/teste/:productId',
      headers: { 'Content-type': 'application/json' },
    });

    expect(request.getBody()).toEqual({ teste: 'teste' });
    expect(request.getHeaders()).toEqual({ 'Content-type': 'application/json' });
    expect(request.getQueryParams()).toEqual({ teste: '123', search: ['teste', 'res', 'aaa'] });
    expect(request.getPathParams()).toEqual({ userId: 'usuario', productId: 'produto' });
  });
});
