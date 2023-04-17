import database from '../../loaders/database';
import Logger from '../../loaders/logger';
import { AcceptUser, Company, CreateAirdrop, RejectUser } from '../../shared/types';
import crypto from 'crypto';
import { ObjectID } from 'mongodb';

export const generateId = (prefix: string) => `${prefix}${crypto.randomInt(10000, 99999)}`;

export const handleGetCompany = async (company_id: string) => {
  try {
    const db = await database();
    const company = await db.collection('communities').findOne({ company_id });

    if (company) {
      return {
        company: company[0],
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    Logger.log({
      level: 'error',
      message: `Error while fetching company - ${error.message}`,
    });
    return { success: false, msg: 'Internal Server Error' };
  }
};

export const handleDeleteCompany = async (company_id: string) => {
  try {
    const db = await database();
    const company = await db.collection('communities').deleteOne({ company_id });

    const success = company ? true : false;
    return {
      success,
    };
  } catch (error) {
    Logger.log({
      level: 'error',
      message: `Error while deleting company - ${error.message}`,
    });
    return { success: false, msg: 'Internal Server Error' };
  }
};

export const handleUpdateCompany = async (company_id: string, body: Company) => {
  try {
    const db = await database();
    const company = await db.collection('communities').updateOne(
      { company_id },
      {
        $set: {
          ...body,
        },
      },
    );

    const success = company ? true : false;

    return {
      success,
    };
  } catch (error) {
    Logger.log({
      level: 'error',
      message: `Error while updating company - ${error.message}`,
    });
    return { success: false, msg: 'Internal Server Error' };
  }
};

export const handleCreateCompany = async (body: Company) => {
  try {
    const db = await database();
    const company = await db.collection('communities').insertOne(body);

    const success = company ? true : false;

    return {
      success,
    };
  } catch (error) {
    Logger.log({
      level: 'error',
      message: `Error while creating company - ${error.message}`,
    });
    return { success: false, msg: 'Internal Server Error' };
  }
};

export const handleCreateAirdrop = async (body: CreateAirdrop) => {
  try {
    const db = await database();
    const airdrop = {
      company_id: body.company_id,
      airdrop_id: generateId('xq'),
      status: body.status,
      contract_address: body.contract_address,
      total_supply: body.total_supply,
      total_people: body.total_people,
      enrolled_users: [],
    };
    const company = await db.collection('airdrop').insertOne(airdrop);

    return {
      success: true,
      code: 200,
      message: 'Airdrop created successfully',
    };
  } catch (error) {
    Logger.log({
      level: 'error',
      message: `Error while updating airdrop - ${error.message}`,
    });
    return { success: false, msg: 'Internal Server Error' };
  }
};

export const handleRejectUser = async (body: RejectUser) => {
  try {
    const db = await database();
    const company = await db
      .collection('users')
      .updateOne(
        { _id: new ObjectID(body.user_id), 'airdrops.airdrop_id': body.airdrop_id },
        { $set: { 'airdrops.$.status': 'rejected' } },
      );

    return {
      success: true,
      code: 200,
      message: 'User rejected successfully',
    };
  } catch (error) {
    Logger.log({
      level: 'error',
      message: `Error while updating user profile - ${error.message}`,
    });
    return { success: false, msg: 'Internal Server Error' };
  }
};

export const handleAcceptUser = async (body: AcceptUser) => {
  try {
    const db = await database();
    const company = await db
      .collection('users')
      .updateOne(
        { _id: new ObjectID(body.user_id), 'airdrops.airdrop_id': body.airdrop_id },
        { $set: { 'airdrops.$.status': 'accepted' } },
      );

    return {
      success: true,
      code: 200,
      message: 'User accepted successfully',
    };
  } catch (error) {
    Logger.log({
      level: 'error',
      message: `Error while updating user profile - ${error.message}`,
    });
    return { success: false, msg: 'Internal Server Error' };
  }
};
