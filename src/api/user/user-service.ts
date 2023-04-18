import { ObjectID } from 'mongodb';
import database from '../../loaders/database';
import Logger from '../../loaders/logger';
import { EnrollUser, User } from '../../shared/types';

export const handleGetUser = async (user_id: string) => {
  try {
    const db = await database();
    const user = await db.collection('users').findOne({ user_id });

    if (user) {
      return {
        user: user[0],
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
      message: `Error while fetching user - ${error.message}`,
    });
    return { success: false, msg: 'Internal Server Error' };
  }
};

export const handleValidateWallet = async (wallet: string) => {
  try {
    const db = await database();
    const user = await db.collection('users').findOne({ wallet_address: wallet });
    let exists = false;
    if (user) {
      exists = true;
    } else {
      exists = false;
    }
    return {
      success: true,
      exists,
    };
  } catch (error) {
    Logger.log({
      level: 'error',
      message: `Error while fetching user - ${error.message}`,
    });
    return { success: false, msg: 'Internal Server Error' };
  }
};

export const handleDeleteUser = async (user_id: string) => {
  try {
    const db = await database();
    const user = await db.collection('users').deleteOne({ user_id });

    const success = user ? true : false;
    return {
      success,
    };
  } catch (error) {
    Logger.log({
      level: 'error',
      message: `Error while deleting user - ${error.message}`,
    });
    return { success: false, msg: 'Internal Server Error' };
  }
};

export const handleUpdateUser = async (user_id: string, body: User) => {
  try {
    const db = await database();
    const user = await db.collection('users').updateOne(
      { user_id },
      {
        $set: {
          ...body,
        },
      },
    );

    const success = user ? true : false;

    return {
      success,
    };
  } catch (error) {
    Logger.log({
      level: 'error',
      message: `Error while updating user - ${error.message}`,
    });
    return { success: false, msg: 'Internal Server Error' };
  }
};

export const handleCreateUser = async (body: User) => {
  try {
    let info = {
      ...body,
      airdrop: [],
      enrolled_company: [],
      subscription_tier: 0,
      trial_period: true,
      joined_at: new Date(),
      updated_at: new Date(),
    };
    const db = await database();
    const user = await db.collection('users').insertOne(info);

    const success = user ? true : false;

    return {
      success,
    };
  } catch (error) {
    Logger.log({
      level: 'error',
      message: `Error while creating user - ${error.message}`,
    });
    return { success: false, msg: 'Internal Server Error' };
  }
};

export const handleEnrollUser = async (body: EnrollUser) => {
  try {
    const db = await database();

    const getUser = await db.collection('users').findOne({ wallet_address: body.wallet_address });

    const getAirdropId = (await db.collection('airdrop').findOne({ company_id: body.company_id, status: 'ongoing' }))
      .airdrop_id;

    const updateAirdropPayload = await db
      .collection('airdrop')
      .updateOne({ company_id: body.company_id, status: 'ongoing' }, { $addToSet: { enrolled_users: getUser._id } });

    const updateUserPayload = db
      .collection('users')
      .updateOne({ wallet_address: body.wallet_address }, { $addToSet: { enrolled_company: body.company_id } });

    const user = await db
      .collection('users')
      .updateOne({ wallet_address: body.wallet_address }, { $addToSet: { airdrops: { airdrop_id: '', status: '' } } });

    return { success: true, message: 'User enrolled successfully' };
  } catch (error) {
    Logger.log({
      level: 'error',
      message: `Error while creating user - ${error.message}`,
    });
    return { success: false, msg: 'Internal Server Error' };
  }
};
