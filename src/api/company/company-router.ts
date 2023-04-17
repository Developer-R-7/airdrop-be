import { getCompany, deleteCompany, createCompany, updateCompany, ongoingAirdrop } from './company-controller';
import express from 'express';

const app = express.Router();

app.get('/:company_id', getCompany);
app.get('/airdrop/:status', ongoingAirdrop);
app.delete('/:company_id', deleteCompany);
app.post('/', createCompany);
app.put('/:company_id', updateCompany);

export default app;
