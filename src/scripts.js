import './styles.css';

const BASE_API_URL = 'https://api.tvmaze.com/shows';
const showsPerPage = 10;
let currentPage = 0;

const getShowsEndpoint = (page) => `${BASE_API_URL}?page=${page}`;

const fetchAndDisplayShows = async () => {
  try {
    const response = await fetch(getShowsEndpoint(currentPage));
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const listElement = document.querySelector('.list-1');

    // Clear the existing list before displaying new shows
    clearList();

    // Display only the first 10 shows
    for (let i = 0; i < showsPerPage; i++) {
      const show = data[i];
      if (!show) break; // If there are fewer than 10 shows, break out of the loop
      const listItem = document.createElement('li');
      listItem.textContent = show.name;
      listElement.appendChild(listItem);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const clearList = () => {
  const listElement = document.querySelector('.list-1');
  while (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }
};

const fetchNextPage = () => {
  currentPage++;
  fetchAndDisplayShows();
};

const loadMoreButton = document.getElementById('load-more-button');
loadMoreButton.addEventListener('click', fetchNextPage);

window.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayShows();
});