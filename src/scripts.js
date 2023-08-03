// script.js
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
    // clearList();

    for (let i = 0; i < showsPerPage; i++) {
      const show = data[i];
      if (!show) break;

      const listItem = document.createElement('li');
      const imageElement = document.createElement('img');
      const titleElement = document.createElement('h3');
      const summaryElement = document.createElement('p');
      const premiereDateElement = document.createElement('p');
      const commentBtn = document.createElement('button');
      const heartIcon = document.createElement('i'); // Heart icon element

      imageElement.src = show.image && show.image.medium ? show.image.medium : 'placeholder.png';
      imageElement.alt = show.name;

      titleElement.textContent = show.name;
      summaryElement.textContent = show.summary || 'No summary available';
      premiereDateElement.textContent = show.premiereDate || 'No premiere date available';
      commentBtn.textContent = 'comment here';
      commentBtn.classList.add('comment-btn'); // Assigning class to the comment button

      // Add heart icon to the list item
    //
    
    
        //    heartIcon.classList.add('i fa-duotone fa-heart');
       
    // Add the heart icon to the list item before the comment button
      listItem.appendChild(imageElement);
      listItem.appendChild(titleElement);
      listItem.appendChild(commentBtn);
      listElement.appendChild(listItem);
      listItem.appendChild(heartIcon); 
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

const navMenus = document.querySelector('.nav-menu');
const openHamburger = document.querySelector('.mobile-menu-icon');
const closeHamburger = document.querySelector('.mobile-menu-close-icon');
const mobileMenuLinks = document.querySelectorAll('.mobile-links');

openHamburger.addEventListener('click', () => {
  navMenus.classList.add('show');
  openHamburger.classList.add('hide');
  closeHamburger.classList.add('show');
  document.body.style.overflow = 'hidden';
});

closeHamburger.addEventListener('click', () => {
  navMenus.classList.remove('show');
  openHamburger.classList.remove('hide');
  closeHamburger.classList.remove('show');
  document.body.style.overflow = 'auto';
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenus.classList.remove('show');
    openHamburger.classList.remove('hide');
    closeHamburger.classList.remove('show');
    document.body.style.overflow = 'auto';
  });
});
