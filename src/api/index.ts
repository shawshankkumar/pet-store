import { Router } from 'express';
import { routerHandler } from './router';

export default (): Router => {
  const app = Router();
  app.use('/pet', routerHandler());
  return app;
};
