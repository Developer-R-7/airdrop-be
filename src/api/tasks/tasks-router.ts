import { Router } from 'express';
import twitterRouter from './integrations/twitter/twitter-controller';
import discordRouter from './integrations/discord/discord-controller';

const app = Router();
app.use('/twitter', twitterRouter);
app.use('/discord', discordRouter);

export default app;
