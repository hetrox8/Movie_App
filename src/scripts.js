// script.js
import './styles.css';

const BASE_API_URL = 'https://api.tvmaze.com/shows';
const showsPerPage = 10;
let currentPage = 0;

const getShowsEndpoint = (page) => `${BASE_API_URL}?page=${page}`;

const getItemLikesEndpoint = (appId, itemId) => `${INVOLVEMENT_API_URL}/apps/${appId}/likes?item_id=${itemId}`;

const getItemLikes = async (appId, itemId) => {
  try {
    const response = await fetch(getItemLikesEndpoint(appId, itemId));
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.length > 0 ? data[0].likes : 0;
  } catch (error) {
    console.error('Error:', error);
    return 0;
  }
};

const fetchLikesForAllShows = async (appId, data) => {
  const likesMap = new Map();
  for (const show of data) {
    const likes = await getItemLikes(appId, show.id);
    likesMap.set(show.id, likes);
  }
  return likesMap;
};

const fetchAndDisplayShows = async () => {
  try {
    const response = await fetch(getShowsEndpoint(currentPage));
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const listElement = document.querySelector('.list-1');

    const appId = 'abc234'; // Your app's unique identifier (replace with the actual identifier)
    const likesMap = await fetchLikesForAllShows(appId, data);

    for (let i = 0; i < showsPerPage; i += 1) {
      const show = data[i];
      if (!show) break;

      const listItem = document.createElement('li');
      const imageElement = document.createElement('img');
      const titleElement = document.createElement('h3');
      const summaryElement = document.createElement('p');
      const premiereDateElement = document.createElement('p');
      const commentBtn = document.createElement('button');
      const heartIcon = document.createElement('i');
      const timify = document.createElement('span');
      imageElement.src = show.image && show.image.medium ? show.image.medium : 'placeholder.png';
      imageElement.alt = show.name;

      titleElement.textContent = show.name;
      summaryElement.textContent = show.summary || 'No summary available';
      premiereDateElement.textContent = show.premiereDate || 'No premiere date available';
      commentBtn.textContent = 'comment here';
      commentBtn.classList.add('comment-btn');

      // Get likes for the current item from the pre-fetched likes map
      const likes = likesMap.get(show.id);

      // Add likes to the list item
      const likesElement = document.createElement('span');
      likesElement.textContent = `Likes: ${likes}`;

      // Add heart icon to the list item
      heartIcon.classList.add('ti-heart', 'icon-heart');
      timify.appendChild(heartIcon);
      // Add the heart icon and likes to the list item before the comment button
      listItem.appendChild(imageElement);
      listItem.appendChild(titleElement);
      listItem.appendChild(commentBtn);
      listItem.appendChild(likesElement);
      listItem.appendChild(timify);
      listElement.appendChild(listItem);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchNextPage = () => {
  currentPage += 1;
  fetchAndDisplayShows();
};

const loadMoreButton = document.getElementById('load-more-button');
loadMoreButton.addEventListener('click', fetchNextPage);

window.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayShows();
});
