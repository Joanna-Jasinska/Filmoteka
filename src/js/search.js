import { showModal, fetchMovieById, renderModal } from './modal';
import { showLoader, removeLoader } from './loader';
import { initializePagination, getData } from './pagination';

const API_KEY = '3453ae595a5d53cbc877c6d05de8a002';

const BASE_URL = 'https://api.themoviedb.org/3';

async function searchMovies(query) {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    //     const newPageResponse = await fetch(
    //       `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${pageNumber}`,
    //     );

    const data = await response.json();
    initializePagination(data, 'insertfunctionhere'); //dodane, żeby paginacja mogła się odpalić
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

async function getGenres(movieId) {
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

    const movieCard = `
      <div data-id=${movie.id} class="movie-card">
        <div class="movie-card__placeholder"><img class="movie-card__image"  src="https://image.tmdb.org/t/p/w500${
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
      renderModal(movie);
      removeLoader();
    });
  });
}

async function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector('.search-form--input');
  const query = searchInput.value;
  const headerAlert = document.querySelector('.notification-alert');

  if (query.length <= 2) {
    headerAlert.textContent = 'Search result not successful. Enter the correct movie name';
    return;
  }
  const movies = await searchMovies(query);
  if (movies.length === 0) {
    headerAlert.textContent = 'There is no such movie in the Filmoteka, please search again';
    return;
  }

  headerAlert.textContent = '';

  displayMovies(movies);
}

const searchButton = document.querySelector('.search-form--button');
searchButton.addEventListener('click', handleSearch);
