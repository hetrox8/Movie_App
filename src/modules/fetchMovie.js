const fetchMovie = async (movieid) => {
  const url = `https://api.tvmaze.com/shows/1/episodebynumber?season=1&number=${movieid}`;
  const response = await fetch(url);
  const movies = await response.json();
  return movies;
};