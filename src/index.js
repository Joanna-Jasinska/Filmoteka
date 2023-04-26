import './sass/main.scss';
import debounce from 'lodash/debounce';
import { fetchPopular } from './js/fetch';
import { removeLoader } from './js/loader';
import { displayMovies } from './js/search';

import './js/pagination';
import './js/modal-devs';
// import { removeModal } from './js/modal';
import { createPagination, fixPaginationBtnsOnWindowChange } from './js/pagination';

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
window.addEventListener('resize', debounce(fixPaginationBtnsOnWindowChange, 30));
