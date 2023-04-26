import '../sass/main.scss';
import './modal-devs';
import './loader.js';
import './modal.js';
import './pagination';
import { getGenres } from './search';
import { createPagination } from './pagination';
import { removeLoader, showLoader } from './loader.js';
import { renderModal, showModal, fetchMovieById } from './modal.js';

const getCurrentPage = () => {
  const currentPageBtn = document.querySelector('.tui-is-selected>.tui-page-nr');
  return currentPageBtn ? parseInt(currentPageBtn.innerHTML) : 1;
};
const getPageFirstIndex = (page = getCurrentPage(), itemsPerPage = 20) => {
  return Math.max((page - 1) * itemsPerPage, 0);
};
const getPageLastIndex = (array, page = getCurrentPage(), itemsPerPage = 20) => {
  const maximumLastIndex = getPageFirstIndex(page) + itemsPerPage;
  return Math.min(array.length, maximumLastIndex);
};
const getLibraryPageMovieList = (array, page) => {
  const moviePage = array.slice(getPageFirstIndex(page), getPageLastIndex(array, page));
  return moviePage;
};

export async function showQueue(page = 1) {
  const queueIds = JSON.parse(localStorage.getItem('queue'));
  let queueMovies = await save(queueIds);
  displayLibraryMovies(getLibraryPageMovieList(queueMovies, page));
  const libraryData = { total_results: queueMovies.length };
  if (queueMovies.length > 3) {
    document.querySelector('.footer').classList.remove('footer-library');
  }
  if (page === 1) {
    createPagination(libraryData, 'library');
  }
  removeLoader();
}
export async function showWatched(page = 1) {
  const watchedIds = JSON.parse(localStorage.getItem('watched'));
  let watchedMovies = await save(watchedIds);
  displayLibraryMovies(getLibraryPageMovieList(watchedMovies, page));
  const libraryData = { total_results: watchedMovies.length };
  if (watchedMovies.length > 3) {
    document.querySelector('.footer').classList.remove('footer-library');
  }
  if (page === 1) {
    createPagination(libraryData, 'library');
  }
  removeLoader();
}

export function displayLibraryMovies(movies, maxGenres = 2) {
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
        <span class="movie-card__overview">${genreText}</span> | <span class="movie-card-library__realease-date">${movie.release_date.slice(
      0,
      4,
    )}
    <span class="movie-card__rating">${movie.vote_average.toFixed(1)}</span>
    </div>
    `;
    moviesContainer.insertAdjacentHTML('beforeend', movieCard);
  });
  moviesContainer.addEventListener('click', async e => {
    if (e.target.closest('.movie-card') === null) {
      return;
    }
    showLoader();
    showModal();
    const movie = await fetchMovieById(e.target.closest('.movie-card').dataset.id);
    showModal(movie);
    renderModal(movie);
    removeLoader();
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

export const refreshLibrary = (page = 1) => {
  const watchedIsSelected = document.querySelector('#watched-button.header-button.is-active');
  if (watchedIsSelected) {
    showWatched(page);
  } else {
    showQueue(page);
  }
};
