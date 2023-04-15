import { getCompany, deleteCompany, createCompany, updateCompany } from './company-controller';
import express from 'express';

const app = express.Router();

app.get('/:company_id', getCompany);
app.delete('/:company_id', deleteCompany);
app.post('/', createCompany);
app.put('/:company_id', updateCompany);

export default app;
