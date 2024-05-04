import { HelloWorld } from './HelloWorld';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Hello world test', () => {
  it('should say hello', async () => {
    const hello = new HelloWorld();
    const sayIt = hello.sayHello();

    expect(sayIt).toEqual('Hello world');
  });
});
