import axios from 'axios';
import { getAppName } from './localstorage';

async function returnLikes() {
  try {
    const response = await axios.get(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppName()}/likes`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export default returnLikes;