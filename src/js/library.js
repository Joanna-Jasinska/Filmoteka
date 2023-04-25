import '../sass/main.scss';
import './modal-devs';
import './loader.js';
import './modal.js';
import './pagination';
import { getGenres } from './search';
import { createPagination } from './pagination';
import { removeLoader, showLoader } from './loader.js';
import { renderModal, showModal, fetchMovieById } from './modal.js';

export async function showQueue() {
  const queueIds = JSON.parse(localStorage.getItem('queue'));
  let queueMovies = await save(queueIds);
  displayMovies(queueMovies);
  const libraryData = { total_results: queueMovies.length };
  createPagination(libraryData, 'library');
  removeLoader();
}
export async function showWatched() {
  const watchedIds = JSON.parse(localStorage.getItem('watched'));
  let watchedMovies = await save(watchedIds);
  displayMovies(watchedMovies);
  const libraryData = { total_results: watchedMovies.length };
  createPagination(libraryData, 'library');
  removeLoader();
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
        <div class="movie-card__placeholder"><img class="movie-card__image" src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" alt="${movie.title}" width="395" height="574"></div>
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
