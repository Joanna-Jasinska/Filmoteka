import './sass/main.scss';
import './js/modal-devs';

const queueIds = JSON.parse(localStorage.getItem('queue'));
const watchedIds = JSON.parse(localStorage.getItem('watched'));

const queueButton = document.querySelector('#queue-btn');
const watchedButton = document.querySelector('#watched-btn');

const API_KEY = '3453ae595a5d53cbc877c6d05de8a002';
const BASE_URL = 'https://api.themoviedb.org/3';

queueButton.addEventListener('click', async () => {
  let queueMovies = await save(queueIds);
  displayMovies(queueMovies);
});
watchedButton.addEventListener('click', async () => {
  let watchedMovies = await save(watchedIds);
  displayMovies(watchedMovies);
});

async function getGenres(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
}

function displayMovies(movies, maxGenres = 2) {
  const moviesContainer = document.querySelector('#library-gallery');
  moviesContainer.innerHTML = '';
  movies.forEach(async movie => {
    const genres = await getGenres(movie.id);
    const genreNames = genres.map(genre => genre.name);
    const displayedGenres =
      genreNames.length > maxGenres ? genreNames.slice(0, maxGenres).concat(['other']) : genreNames;
    const genreText = displayedGenres.join(', ');

    const movieCard = `
      <div data-id=${movie.id} class="movie-card">
        <img class="movie-card__image" src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" alt="${movie.title}" width="395" height="574">
        <h2 class="movie-card__tittle">${movie.title}</h2>
        <p class="movie-card__info"> 
        <span class="movie-card__overview">${genreText}</span> | <span class="movie-card__realease-date">${movie.release_date.slice(
      0,
      4,
    )}
    `;
    moviesContainer.insertAdjacentHTML('beforeend', movieCard);
  });
  moviesContainer.addEventListener('click', e => {
    if (e.target.closest('.movie-card') === null) {
      return;
    }
    showLoader();
    showModal();
    fetchMovieById(e.target.closest('.movie-card').dataset.id).then(movie => {
      renderModal(movie);
      removeLoader();
    });
  });
}

const fetchMovieById = async movie_id => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=964358699754c21d74c014b561cf196c&language=en-US`,
    );
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.log(error);
  }
};
async function save(tab) {
  const moviesData = await Promise.all(
    tab.map(async movieId => {
      const movieData = await fetchMovieById(movieId);
      return movieData;
    }),
  );
  return moviesData;
}
