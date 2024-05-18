import { Router } from '../../routes/Router';

export interface IServer {
  setRouter(router: Router): void;
  listen(port: number, callback: () => void): void;
}
