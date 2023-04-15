import { getUser, deleteUser, createUser, updateUser } from './user-controller';
import express from 'express';

const app = express.Router();

app.get('/:user_id', getUser);
app.delete('/:user_id', deleteUser);
app.post('/', createUser);
app.put('/:user_id', updateUser);

export default app;
