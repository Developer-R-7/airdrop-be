import database from '../../loaders/database';
import Logger from '../../loaders/logger';
import { Company } from '../../shared/types';

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
    let info = {
      ...body,
      airdrops: [],
      enrolled_users: [],
      joined_at: new Date(),
      updated_at: new Date(),
    };
    const db = await database();
    const company = await db.collection('communities').insertOne(info);

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
