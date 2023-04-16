import { Router, Request, Response } from 'express';
import config from '../../../../config';
import { verifyGuild, getCompanyDiscordGuildID } from './discord-service';

const handleVerifyGuild = async (req: Request, res: Response) => {
  try {
    const { code, state } = req.query;
    const companyID = decodeURIComponent(state.toString());
    if (!code) {
      return res.status(400).json({ status: false, message: 'Access code not found.' });
    }
    if (!companyID) {
      return res.status(400).json({ status: false, message: 'Company ID not found.' });
    }

    const getCompanyGuildID = await getCompanyDiscordGuildID(companyID);
    const result = await verifyGuild(code, getCompanyGuildID);

    return res.status(200).json({ taskStatus: result });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message || 'Internal Server Error' });
  }
};

const app = Router();
app.get('/verify-guild', handleVerifyGuild);
export default app;
