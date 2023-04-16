import config from '../config';

export const twitterConfig = {
  headers: {
    Authorization: `Bearer ${config.twitterToken}`,
  },
};

export const discordConfig = {
  client_id: config.discordClientId,
  client_secret: config.discordClientSecret,
};
