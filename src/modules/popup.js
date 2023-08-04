import closeImg from '../assets/close.png';

const fetchMovie = async (movieid) => {
  console.log(movieid);
  const url = `https://api.tvmaze.com/shows/1/episodebynumber?season=1&number=${movieid}`;
  const response = await fetch(url);
  const movies = await response.json();
  return movies;
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
      <div class="commentDiv">
        <h4>Comments</h4>
        <p class="comments">2024/06/11: dummy comment</p>
      </div>
      <div class="formDiv">
        <h2>Add a Comment</h2>
        <form class="commentForm">
          <input type="text" class="nameField" placeholder="Your name" />
          <textarea class="commentField" placeholder="Your remarks" rows="5" cols="30"></textarea>
          <button type="submit" class="addComment">add Comment</button>
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
};

export default displayCommentPop;