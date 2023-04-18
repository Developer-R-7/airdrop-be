import {
  getCompany,
  deleteCompany,
  createCompany,
  updateCompany,
  createAirdrop,
  rejectUser,
  acceptUser,
  ongoingAirdrop,
  enrolledUsers,
} from './company-controller';
import express from 'express';

const app = express.Router();

app.get('/:company_id', getCompany);
app.get('/airdrop/:status', ongoingAirdrop);
app.delete('/:company_id', deleteCompany);
app.post('/', createCompany);
app.put('/:company_id', updateCompany);
app.post('/create-airdrop', createAirdrop);
app.post('/reject-user', rejectUser);
app.post('/accept-user', acceptUser);
app.get('/enrolled-users/:company_id', enrolledUsers);

export default app;
