import axios from 'axios';

const movieCount = document.querySelector('.movie-count');

const count = async () => {
  try {
    const response = await axios.get('https://api.tvmaze.com/shows/1/episodes');
    const result = response.data;
    const movies = result.splice(0, 12);
    movieCount.innerHTML = movies.length.toString();
  } catch (error) {
    console.error('Error:', error);
  }
};

export default count;