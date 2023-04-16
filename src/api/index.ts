import { Router } from 'express';

import tasksRouter from './tasks/tasks-router';
import userRouter from './user/user-router';
import companyRouter from './company/company-router';

export default (): Router => {
  const app = Router();
  app.use('/user', userRouter);
  app.use('/company', companyRouter);
  app.use('/tasks', tasksRouter);

  return app;
};
