import axios from 'axios';
import likeMovie from './add-likes';
import heart from '../assets/heart.png';

const displayMovies = document.querySelector('.display-movies');

const displayList = async () => {
  try {
    const response = await axios.get('https://api.tvmaze.com/shows/1/episodes');

    const result = response.data;
    const movies = result.splice(0, 24);
    movies.forEach((movie) => {
      const img = document.createElement('img');
      img.setAttribute('src', heart);
      img.className = 'like-icon';
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
      <img src="${movie.image.medium}" alt="${movie.name}" class="image">
      <h3>${movie.name}</h3>
      <div class="card-body">
        <button>Comment</button>
        <p>${img.outerHTML} <span class="like-count">0</span> Likes</p>
      </div>
      `;
      displayMovies.appendChild(card);

      const likeIcon = card.querySelector('.like-icon');
      likeIcon.addEventListener('click', () => {
        likeMovie(movie.id);
      });
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

export default displayList;
