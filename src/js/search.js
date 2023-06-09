import { showModal, fetchMovieById, renderModal } from './modal';
import { showLoader, removeLoader } from './loader';
import { createPagination } from './pagination';

const API_KEY = '3453ae595a5d53cbc877c6d05de8a002';

const BASE_URL = 'https://api.themoviedb.org/3';

async function searchMovies(query) {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    createPagination(data, 'search', query);
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getGenres(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
}

export function displayMovies(movies, maxGenres = 2) {
  const moviesContainer = document.getElementById('movies-gallery');
  moviesContainer.innerHTML = '';
  movies.forEach(async movie => {
    const genres = await getGenres(movie.id);
    const genreNames = genres.map(genre => genre.name);
    const displayedGenres =
      genreNames.length > maxGenres ? genreNames.slice(0, maxGenres).concat(['other']) : genreNames;
    const genreText = displayedGenres.join(', ');
    if (movie.release_date === undefined) {
      movie.release_date = 'none';
    }
    const movieCard = `
      <div data-id=${movie.id} class="movie-card">
        <div class="movie-card__placeholder">
        <img class="movie-card__image"
        src="https://image.tmdb.org/t/p/original${movie.poster_path}"
        srcset =
        "https://image.tmdb.org/t/p/w500${movie.poster_path}, https://image.tmdb.org/t/p/original${
      movie.poster_path
    } 2x " 
        alt="${movie.title}" width="395" height="574"></div>
        <h2 class="movie-card__tittle">${movie.title}</h2>
        <p class="movie-card__info"> 
        <span class="movie-card__overview">${genreText}</span> | <span class="movie-card__realease-date">${movie.release_date.slice(
      0,
      4,
    )}
    `;
    moviesContainer.insertAdjacentHTML('beforeend', movieCard);
  });
  if (movies.length < 3) {
    document.querySelector('.footer').classList.add('footer-library');
  }
  moviesContainer.addEventListener('click', async e => {
    if (e.target.closest('.movie-card') === null) {
      return;
    }
    showLoader();
    showModal();
    const movie = await fetchMovieById(e.target.closest('.movie-card').dataset.id);
    renderModal(movie);
    removeLoader();
  });
}
async function searchWithDebounce(query, delay) {
  let timeoutId;

  return new Promise((resolve, reject) => {
    timeoutId = setTimeout(async () => {
      try {
        const movies = await searchMovies(query);
        resolve(movies);
      } catch (error) {
        reject(error);
      }
    }, delay);
  }).finally(() => {
    clearTimeout(timeoutId);
  });
}

let searchTimeoutId;

async function handleSearch(e) {
  e.preventDefault();
  const searchInput = document.querySelector('.search-form--input');
  const query = searchInput.value;
  const headerAlert = document.querySelector('.notification-alert');

  if (query.length <= 2) {
    headerAlert.textContent = 'Search result not successful. Enter the correct movie name';
    return;
  }

  headerAlert.textContent = '';

  showLoader();

  if (searchTimeoutId) {
    clearTimeout(searchTimeoutId);
  }

  searchTimeoutId = setTimeout(async () => {
    try {
      const movies = await searchWithDebounce(query, 500);
      if (movies.length === 0) {
        headerAlert.textContent = 'There is no such movie in the Filmoteka, please search again';
      }
      displayMovies(movies);
    } catch (error) {
      console.error(error);
    } finally {
      removeLoader();
    }
  }, 500);
}

const searchButton = document.querySelector('.search-form--button');
if (searchButton) {
  searchButton.addEventListener('click', handleSearch);
}
