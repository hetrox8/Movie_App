import './styles.css';

const BASE_API_URL = 'https://api.tvmaze.com/shows';
const showsPerPage = 10;
let currentPage = 0;
let currentPopup = null;
const projectId = 'jjyD0ZHHaDsJOn5G8Ri2';
const involvementAPI = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${projectId}`;

const getShowsEndpoint = (page) => `${BASE_API_URL}?page=${page}`;

const postComment = async (id, username, comment) => {
  await fetch(`${involvementAPI}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
      username,
      comment,
    }),
  });
};

const getComment = async (id) => {
  const response = await fetch(`${involvementAPI}/comments?item_id=${id}`);
  const data = await response.json();
  return data;
};

const popupCard = async (show) => {
  const popup = document.querySelector('.popup');

  if (currentPopup) {
    popup.removeChild(currentPopup);
  }

  const popupCommentCard = document.createElement('div');
  popupCommentCard.classList.add('popup-comment-card');

  popupCommentCard.innerHTML = `
    <div class='pop-card'>
      <span class='popup-close-button'><i class="ti-close"></i></span>
      <img src='${show.image && show.image.medium ? show.image.medium : 'placeholder.png'}' alt='${show.name}' />
      <h2>${show.name}</h2>
      <p>${show.summary}</p>
      <div>
        <h3>Comments (0)</h3>
        <ul class='comments-list'></ul>
      </div>
      <h3>Add a comment</h3>
      <form class='comment-form'>
        <input type='text' class='user-commenting' placeholder='Your name' />
        <textarea class='comment-text' placeholder='Your insights'></textarea>
        <button class='comment-btn' type='submit'>Comment</button>
      </form>
    </div>
  `;

  popup.appendChild(popupCommentCard);
  currentPopup = popupCommentCard;

  const popupCloseButton = document.querySelector('.popup-close-button');

  popupCloseButton.addEventListener('click', () => {
    popup.removeChild(popupCommentCard);
    currentPopup = null;
  });
};

const updateCommentsList = async (showId) => {
  const commentsListElement = document.querySelector('.comments-list');
  try {
    const comments = await getComment(showId);

    // Clear the existing comments list
    commentsListElement.innerHTML = '';

    // Update the "Comments (x)" header
    const commentsHeader = document.querySelector('.popup-comment-card h3');
    commentsHeader.textContent = `Comments (${comments.length})`;

    // Append each comment to the comments list
    comments.forEach((comment) => {
      const commentItem = document.createElement('li');
      commentItem.textContent = `${comment.username}: ${comment.comment}`;
      commentsListElement.appendChild(commentItem);
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchAndDisplayShows = async () => {
  try {
    const response = await fetch(getShowsEndpoint(currentPage));
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const listElement = document.querySelector('.list-1');

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

      commentBtn.addEventListener('click', () => popupCard(show));

      heartIcon.classList.add('ti-heart', 'icon-heart');
      timify.appendChild(heartIcon);

      listItem.appendChild(imageElement);
      listItem.appendChild(titleElement);
      listItem.appendChild(commentBtn);
      listElement.appendChild(listItem);
      listItem.appendChild(timify);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

/* const clearList = () => {
  const listElement = document.querySelector('.list-1');
  while (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }
};
*/
const fetchNextPage = () => {
  currentPage += 1;
  fetchAndDisplayShows();
};

const loadMoreButton = document.getElementById('load-more-button');
if (loadMoreButton) {
  loadMoreButton.addEventListener('click', fetchNextPage);
}

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