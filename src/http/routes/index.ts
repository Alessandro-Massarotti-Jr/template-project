import { readyController } from '../controllers/readyController';
import { Router } from '../infrastructure/Router/Router';

const router = Router.getInstance();
router.get('/', [readyController.handle]);

export { router };
