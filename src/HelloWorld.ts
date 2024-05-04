export interface IHelloWorld {
  sayHello(): string;
}

export class HelloWorld implements IHelloWorld {
  sayHello(): string {
    return 'Hello world';
  }
}
