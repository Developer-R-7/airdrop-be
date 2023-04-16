import axios from 'axios';

export const getUserGuilds = async (accessToken: string) => {
  try {
    const guildsResponse = await axios.get(`https://discord.com/api/v10/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const guildsData = guildsResponse.data;
    const guildIds = guildsData.map((guild: any) => guild.id);
    return guildIds;
  } catch (err) {
    throw { code: 500, message: 'Verifying guild failed' };
  }
};
