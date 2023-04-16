import { Router, Request, Response } from 'express';
import { verifyGuild, getCompanyDiscordGuildID } from './discord-service';

const handleVerifyGuild = async (req: Request, res: Response) => {
  try {
    const { code, companyID } = req.query;
    if (!code) {
      return res.status(400).json({ status: false, message: 'Access code not found.' });
    }
    if (!companyID) {
      return res.status(400).json({ status: false, message: 'Company ID not found.' });
    }

    const getCompanyGuildID = await getCompanyDiscordGuildID(companyID.toString());
    const result = await verifyGuild(code, getCompanyGuildID.toString());

    return res.status(200).json({ message: 'Guild verified successfully.', taskStatus: result });
  } catch (err) {
    return res.status(err.code || 500).json({ status: false, message: err.message || 'Internal Server Error' });
  }
};

const app = Router();
app.get('/verify-guild', handleVerifyGuild);
export default app;
