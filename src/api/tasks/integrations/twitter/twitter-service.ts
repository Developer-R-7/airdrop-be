import axios from 'axios';
import { twitterConfig } from '../../../../loaders/constants';

const checkFollowing = async (username: string, accountName: string) => {
  try {
    const userId = await getUserId(username);
    const following = await axios
      .get(`https://api.twitter.com/2/users/${userId}/following?user.fields=created_at&max_results=1000`, twitterConfig)
      .then(res => res.data);
    const followingIds = following.data.map((user: any) => user.id);
    const accountUserId = await getUserId(accountName);
    return followingIds.includes(accountUserId);
  } catch (err) {
    return err;
  }
};

const getUserId = async (username: string) => {
  try {
    const userInfo = await axios
      .get(`https://api.twitter.com/2/users/by/username/${username}`, twitterConfig)
      .then(res => res.data);
    return userInfo.data.id;
  } catch (err) {
    return err;
  }
};
