import axios from 'axios';
import getAppName from './localstorage';
import errorMsg from './error-message';

const fetchLikes = async (itemId) => {
  try {
    const response = await axios.get(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppName()}/likes/`);
    const likes = response.data;
    const itemLikes = likes.find((like) => like.item_id === itemId);
    return itemLikes ? itemLikes.likes : 0;
  } catch (error) {
    errorMsg('Error', 'red');
    return 0;
  }
};

export default fetchLikes;