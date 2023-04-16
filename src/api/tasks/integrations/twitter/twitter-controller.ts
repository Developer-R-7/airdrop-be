import { Router, Request, Response } from 'express';

const handleVerifyFollowing = async (req: Request, res: Response) => {
  const { twitterId } = req.query;
};

const app = Router();
app.get('/verify-following', handleVerifyFollowing);

export default app;
