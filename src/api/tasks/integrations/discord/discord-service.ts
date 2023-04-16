import { discordConfig } from '../../../../loaders/constants';
import axios from 'axios';
import { getUserGuilds } from './discord-utils';
import config from '../../../../config';
import dbClient from '../../../../loaders/database';

export const verifyGuild = async (authCode: any, companyDiscordGuildID: string) => {
  try {
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
    throw { code: 500, message: 'Verifying guild failed' };
  }
};

export const getCompanyDiscordGuildID = async (companyID: string) => {
  const db = (await dbClient()).collection('companies');
  const guildID = db.findOne({ _id: companyID });
  if (!guildID) {
    throw { code: 404, message: 'Company not found.' };
  }
  return guildID;
};
