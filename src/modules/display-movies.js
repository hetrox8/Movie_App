import axios from 'axios';
import likeMovie from './add-likes';
import heart from '../assets/heart.png';
import displayCommentPop from './popup';
import fetchLikes from './display-likes';

const displayMovies = document.querySelector('.display-movies');
const movieCount = document.querySelector('.movie-count'); // Add a reference to the element displaying the count

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

count();

const displayList = async () => {
  try {
    const response = await axios.get('https://api.tvmaze.com/shows/1/episodes');

    const result = response.data;
    const movies = result.splice(0, 12);
    movies.forEach(async (movie) => {
      const img = document.createElement('img');
      img.setAttribute('src', heart);
      img.className = 'like-icon';
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${movie.image.medium}" alt="${movie.name}" class="image">
        <h3>${movie.name}</h3>
        <div class="card-body">
          <button class="commentBtn">Comment</button>
          <p>${img.outerHTML} <span class="like-count">0</span> Likes</p>
        </div>
      `;
      displayMovies.appendChild(card);

      const likeCount = card.querySelector('.like-count');
      const likes = await fetchLikes(movie.id);
      likeCount.textContent = `${likes}`;

      const likeIcon = card.querySelector('.like-icon');
      likeIcon.addEventListener('click', async () => {
        await likeMovie(movie.id);
        const likes = await fetchLikes(movie.id);
        likeCount.textContent = `${likes}`;
      });

      const commentBtn = card.querySelector('.commentBtn');
      const popContainer = document.querySelector('.popContainer');
      commentBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const movieid = movie.id;
        await displayCommentPop(movieid);
        document.body.style.overflow = 'hidden';
        popContainer.style.display = 'block';
      });
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

export default displayList;
