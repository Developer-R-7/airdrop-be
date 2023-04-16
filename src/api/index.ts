import { Router } from 'express';
import tasksRouter from './tasks/tasks-router';
export default (): Router => {
  const app = Router();

  app.use('/tasks', tasksRouter());

  return app;
};
