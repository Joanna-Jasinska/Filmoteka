import '../sass/main.scss';
import './modal-devs';
import './loader.js';
import './modal.js';
import './pagination';
import { getGenres } from './search';
import { createPagination } from './pagination';
import { removeLoader, showLoader } from './loader.js';
import { renderModal, showModal, fetchMovieById } from './modal.js';

const queueIds = JSON.parse(localStorage.getItem('queue'));
const watchedIds = JSON.parse(localStorage.getItem('watched'));

const queueButton = document.querySelector('#queue-btn');
const watchedButton = document.querySelector('#watched-btn');

const API_KEY = '3453ae595a5d53cbc877c6d05de8a002';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function showQueue() {
  let queueMovies = await save(queueIds);
  displayMovies(queueMovies);
  const libraryData = { total_results: queueMovies.length };
  createPagination(libraryData, 'library');
  removeLoader();
}
export async function showWatched() {
  let watchedMovies = await save(watchedIds);
  displayMovies(watchedMovies);
  const libraryData = { total_results: watchedMovies.length };
  createPagination(libraryData, 'library');
  removeLoader();
}
queueButton.addEventListener('click', () => {
  showQueue();
});
watchedButton.addEventListener('click', () => {
  showWatched();
});

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
      <div data-id=${movie.id} class="movie-card-library">
        <div class="movie-card-library__placeholder"><img class="movie-card-library__image" src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" alt="${movie.title}" width="395" height="574"></div>
        <h2 class="movie-card-library__tittle">${movie.title}</h2>
        <p class="movie-card-library__info"> 
        <span class="movie-card-library__overview-library">${genreText}</span> | <span class="movie-card-library__realease-date-library">${movie.release_date.slice(
      0,
      4,
    )}
    <span class="movie-card-library__rating">${movie.vote_average.toFixed(1)}</span>
    </div>
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
      showModal(movie);
      renderModal(movie);
      removeLoader();
    });
  });
}

async function save(tab) {
  const moviesData = await Promise.all(
    tab.map(async movieId => {
      const movieData = await fetchMovieById(movieId);
      return movieData;
    }),
  );
  return moviesData;
}
