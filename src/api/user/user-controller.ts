import { Request, Response } from 'express';
import {
  handleGetUser,
  handleDeleteUser,
  handleCreateUser,
  handleUpdateUser,
  handleValidateWallet,
} from './user-service';

export const getUser = async (req: Request, res: Response) => {
  const data = await handleGetUser(req.params.user_id);
  res.status(data.success ? 200 : 500).json(data);
};

export const createUser = async (req: Request, res: Response) => {
  const data = await handleCreateUser(req.body);
  res.status(data.success ? 200 : 500).json(data);
};

export const deleteUser = async (req: Request, res: Response) => {
  const data = await handleDeleteUser(req.params.user_id);
  res.status(data.success ? 200 : 500).json(data);
};

export const updateUser = async (req: Request, res: Response) => {
  const data = await handleUpdateUser(req.params.user_id, req.body);
  res.status(data.success ? 200 : 500).json(data);
};

export const validateWallet = async (req: Request, res: Response) => {
  const data = await handleValidateWallet(req.params.wallet);
  res.status(data.success ? 200 : 500).json(data);
};
