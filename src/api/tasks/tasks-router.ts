import { Router } from 'express';
import twitterRouter from './integrations/twitter/twitter-controller';
import discordRouter from './integrations/discord/discord-controller';

export default (): Router => {
  const app = Router();
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  app.use('/twitter', twitterRouter);
  app.use('/discord', discordRouter);

  return app;
};
