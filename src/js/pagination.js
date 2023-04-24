//import funkcji do wyświetlania filmów
import { displayMovies } from './search';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

//stałe
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '964358699754c21d74c014b561cf196c';

//kontener na paginatory
const paginationContainer = document.querySelector('.tui-pagination');

const getMaxPage = (hits, perPage) => {
  const pages = Math.ceil(hits / perPage);
  if (pages < 1000) return pages;
  // if (pages >= 37900) return '379..';
  return pages.toString().substring(0, 3) + '..';
};

//funkcja inicjująca paginację z opcjami
export async function createPagination(data, site, query) {
  try {
    console.log(data.total_results);
    const options = {
      totalItems: `${data.total_results}`,
      itemsPerPage: 20,
      visiblePages: 5,
      page: 1,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      template: {
        page: '<a href="#" class="tui-page-btn page-{{page}}">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="tui-page-btn tui-{{type}}">' +
          `<div class="icon-arrow icon-arrow-{{type}} icon-arrow-1 ">${1}</div>` +
          `<div class="icon-arrow icon-arrow-{{type}} icon-arrow-hits">${getMaxPage(
            data.total_results,
            20,
          )}</div>` +
          '</a>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          // '<span class="tui-ico-{{type}}">{{type}}</span>' +
          `<div class="icon-arrow icon-arrow-{{type}}"></div>` +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>',
      },
    };
    const pagination = new Pagination(paginationContainer, options);
    pagination.on('beforeMove', async event => {
      const { page } = event;
      let newPageResponse;
      if (site === 'popular') {
        newPageResponse = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
      } else if (site === 'library') {
        newPageResponse = '';
      } else {
        newPageResponse = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
        );
      }
      const movie = await newPageResponse.json();
      displayMovies(movie.results);
    });
  } catch (error) {
    console.error(error);
  }
}
