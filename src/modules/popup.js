import axios from 'axios';
import closeImg from '../assets/close.png';
import getAppName from './localStorage';
import commentCounter from './commentCount';

const fetchMovie = async (movieid) => {
  console.log(movieid);
  const url = `https://api.tvmaze.com/shows/1/episodebynumber?season=1&number=${movieid}`;
  const response = await fetch(url);
  const movies = await response.json();
  return movies;
};

const postComments = async (id, username, comment) => {
  const response = await axios.post(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppName()}/comments`, {
    item_id: id,
    username,
    comment,
  });
  const commentDiv = document.querySelector('.commentDiv');
  let today = new Date();
  console.log(today);
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  today = `${yyyy}-${mm}-${dd}`;
  const p = document.createElement('p');
  p.innerHTML = `
    ${today}  ${username}: ${comment}
  `;
  commentDiv.appendChild(p);
  console.log('Comment added:', response.data);
  commentCounter();
};

const displayComments = async (id) => {
  try {
    const response = await axios.get(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppName()}/comments?item_id=${id}`);
    const comments = response.data;

    const commentsContainer = document.querySelector('.commentDiv');
    commentsContainer.innerHTML = '';

    comments.forEach((comment) => {
      const newComment = document.createElement('p');
      newComment.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
      commentsContainer.appendChild(newComment);
    });
  } catch (error) {
    console.error(error);
  }
  commentCounter();
};

const popContainer = document.querySelector('.popContainer');
const displayCommentPop = async (movieid) => {
  const movieDetails = await fetchMovie(movieid);
  const popup = document.createElement('div');
  popup.classList.add('popup');
  const img = document.createElement('img');
  img.setAttribute('src', closeImg);
  img.className = 'closeBtn';
  popup.innerHTML = `
    <div class="pop">
      ${img.outerHTML}
      <img class="img" src="${movieDetails.image.original}" alt="${movieDetails.name}" />
      <h2 class="title">${movieDetails.name}</h2>
      <p class="summary">${movieDetails.summary}</p>
      <h4>Comments</h4><span class="counter"></span>
      <div class="commentDiv">
      </div>
      <div class="formDiv">
        <h2>Add a Comment</h2>
        <form class="commentForm">
          <input type="text" class="nameField" placeholder="Your name" />
          <textarea class="commentField" placeholder="Your remarks" rows="5" cols="30"></textarea>
          <button type="submit" id="${movieDetails.id}" class="addComment">add Comment</button>
        </form>
      </div>
    </div>
  `;

  popContainer.appendChild(popup);
  const close = document.querySelector('.closeBtn');
  close.addEventListener('click', () => {
    document.body.style.overflow = 'auto';
    popContainer.style.display = 'none';
    window.location.reload();
  });

  const addComment = document.querySelector('.commentForm');
  addComment.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.querySelector('.nameField').value;
    const comment = document.querySelector('.commentField').value;
    if (username.trim() === '' || comment.trim() === '') {
      console.log('empty');
    } else {
      postComments(movieDetails.id, username, comment);
      displayComments(movieDetails.id);
      addComment.reset();
    }
  });
  displayComments(movieDetails.id);
};

export default displayCommentPop;
