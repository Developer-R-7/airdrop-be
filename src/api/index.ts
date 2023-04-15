import { Router } from 'express';
import UserRouter from './user/user-router';

export default (): Router => {
  const app = Router();

  app.use('/user', UserRouter);

  return app;
};
