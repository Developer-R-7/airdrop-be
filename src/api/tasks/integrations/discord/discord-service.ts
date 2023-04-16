import { discordConfig } from '../../../../loaders/constants';
import axios from 'axios';
import { getUserGuilds } from './discord-utils';
import config from '../../../../config';
import dbClient from '../../../../loaders/database';
import { ObjectId } from 'mongodb';

export const verifyGuild = async (authCode: any, companyDiscordGuildID: string) => {
  try {
    if (!companyDiscordGuildID) {
      throw { code: 404, message: 'Company not found.' };
    }
    const tokenResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        ...discordConfig,
        redirect_uri: `${config.hostname}/api/tasks/discord/verify-guild`,
        code: authCode,
        grant_type: 'authorization_code',
        scope: 'identify guilds',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const accessToken = tokenResponse.data.access_token;
    const userGuildsID = await getUserGuilds(accessToken);
    const foundGuild = userGuildsID.find((guild: any) => guild.id === companyDiscordGuildID);
    if (foundGuild) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw { code: err.code || 500, message: err.message || 'Verifying guild failed' };
  }
};

export const getCompanyDiscordGuildID = async (companyID: string) => {
  console.log(companyID);
  const db = (await dbClient()).collection('communities');
  const getCompanyProfile = await db.findOne({ _id: new ObjectId(companyID) });
  if (!getCompanyProfile) {
    throw { code: 404, message: 'Company not found.' };
  }
  return getCompanyProfile.social_handles.discord.guildId;
};
