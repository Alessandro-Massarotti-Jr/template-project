import { Router } from '../../infrastructure/Router/Router';
import * as http from 'http';

export interface IServer {
  setRouter(router: Router): void;
  listen(port: number, callback: () => void): void;
  close(): void;
  getServerInstance(): http.Server;
}
