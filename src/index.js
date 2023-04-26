import './sass/main.scss';
import { fetchPopular } from './js/fetch';
import { removeLoader } from './js/loader';
import { displayMovies } from './js/search';

import './js/pagination';
import './js/modal-devs';
import { removeModal } from './js/modal';
import { createPagination } from './js/pagination';

fetchPopular()
  .then(popularMovies => {
    const movies = popularMovies.results;
    displayMovies(movies);
    createPagination(popularMovies, 'popular');
    // removeModal();
  })
  .catch(error => console.error(error))
  .finally(() => {
    removeLoader();
  });
