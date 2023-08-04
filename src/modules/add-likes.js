import axios from 'axios';
import getAppName from './localstorage';

const likeMovie = async (movieId) => {
  try {
    const response = await axios.post(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppName()}/likes`, {
      item_id: movieId,
    });
    console.log('Movie liked:', response.data);
  } catch (error) {
    console.error('Error liking the movie:', error);
  }
};

export default likeMovie;