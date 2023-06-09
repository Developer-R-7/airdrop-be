import { Request, Response } from 'express';
import {
  handleGetCompany,
  handleDeleteCompany,
  handleCreateCompany,
  handleUpdateCompany,
  handleOngoingAirdrop,
  handleCreateAirdrop,
  handleEnrolledUsers,
  handleRejectUser,
  handleAcceptUser,
} from './company-service';

export const getCompany = async (req: Request, res: Response) => {
  const data = await handleGetCompany(req.params.company_id);
  res.status(data.success ? 200 : 500).json(data);
};

export const createCompany = async (req: Request, res: Response) => {
  const data = await handleCreateCompany(req.body);
  res.status(data.success ? 200 : 500).json(data);
};

export const deleteCompany = async (req: Request, res: Response) => {
  const data = await handleDeleteCompany(req.params.company_id);
  res.status(data.success ? 200 : 500).json(data);
};

export const updateCompany = async (req: Request, res: Response) => {
  const data = await handleUpdateCompany(req.params.company_id, req.body);
  res.status(data.success ? 200 : 500).json(data);
};

export const ongoingAirdrop = async (req: Request, res: Response) => {
  const data = await handleOngoingAirdrop(req.params.status);
  res.status(data.success ? 200 : 500).json(data);
};

export const createAirdrop = async (req: Request, res: Response) => {
  const data = await handleCreateAirdrop(req.body);
  res.status(data.success ? 200 : 500).json(data);
};

export const rejectUser = async (req: Request, res: Response) => {
  const data = await handleRejectUser(req.body);
  res.status(data.success ? 200 : 500).json(data);
};

export const acceptUser = async (req: Request, res: Response) => {
  const data = await handleAcceptUser(req.body);
  res.status(data.success ? 200 : 500).json(data);
};

export const enrolledUsers = async (req: Request, res: Response) => {
  const data = await handleEnrolledUsers(req.params.company_id);
  res.status(data.success ? 200 : 500).json(data);
};
