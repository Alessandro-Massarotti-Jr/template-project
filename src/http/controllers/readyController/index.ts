import { readyUseCase } from '../../../useCases/readyUseCase';
import { ReadyController } from './ReadyController';

const readyController = new ReadyController(readyUseCase);
export { readyController };
