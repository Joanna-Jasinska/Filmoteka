//import funkcji do wyświetlania filmów
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { displayMovies } from './search';
import { refreshLibrary } from './library';

//stałe
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '964358699754c21d74c014b561cf196c';

//kontener na paginatory
const paginationContainer = document.querySelector('.tui-pagination');

const getMaxPage = (hits, perPage) => {
  const pages = Math.ceil(hits / perPage);
  return Math.min(pages, 500);
};

export const fixPaginationBtnsOnWindowChange = () => {
  const isMobile = window.innerWidth < 768;
  const lastBnt = document.querySelector('.page-last');
  const nearLastNrBtn = document.querySelector('.page-near-last');

  const nextEllip = document.querySelector('.tui-next-is-ellip');
  const prevEllip = document.querySelector('.tui-prev-is-ellip');
  const secondBtn = document.querySelector('.page-2');
  const tuiFirst = document.querySelector('.tui-first');
  const tuiLast = document.querySelector('.tui-last');
  const tuiPrev = document.querySelector('.tui-prev');
  const tuiNext = document.querySelector('.tui-next');
  if (lastBnt) lastBnt.classList.add('tui-btn-disabled');
  if (isMobile) {
    console.log('mobile. removing more pagination buttons');
    const selectedBtnP = document.querySelector('.tui-is-selected>p');
    if (nextEllip) nextEllip.classList.add('tui-btn-disabled');
    if (prevEllip) prevEllip.classList.add('tui-btn-disabled');
    console.log(selectedBtnP);
    if (nearLastNrBtn) {
      if (tuiLast) tuiLast.classList.remove('tui-btn-disabled');
      if (tuiNext) tuiNext.classList.add('tui-btn-disabled');
    } else {
      if (tuiLast) tuiLast.classList.add('tui-btn-disabled');
      if (tuiNext) tuiNext.classList.remove('tui-btn-disabled');
    }
    if (secondBtn && selectedBtnP.innerHTML != '3') {
      if (tuiFirst) tuiFirst.classList.remove('tui-btn-disabled');
      if (tuiPrev) tuiPrev.classList.add('tui-btn-disabled');
    } else {
      if (tuiFirst) tuiFirst.classList.add('tui-btn-disabled');
      if (tuiPrev) tuiPrev.classList.remove('tui-btn-disabled');
    }
  } else {
    // tablet/pc

    if (nextEllip && nearLastNrBtn) {
      nextEllip.classList.add('tui-btn-disabled');
    } else {
      if (nextEllip) nextEllip.classList.remove('tui-btn-disabled');
    }
    if (prevEllip && secondBtn) {
      prevEllip.classList.add('tui-btn-disabled');
    } else {
      if (prevEllip) prevEllip.classList.remove('tui-btn-disabled');
    }
  }
};

const removeExcessPaginationBtns = data => {
  console.log('removeExcessPaginationBtns()');
  const oldPL = document.querySelector('.page-last');
  const oldPNL = document.querySelector('.page-near-last');
  if (oldPL) oldPL.classList.remove('page-last');
  if (oldPNL) oldPNL.classList.remove('page-near-last');
  const nearLastNrBtn = document.querySelector('.page-' + (getMaxPage(data.total_results, 20) - 1));
  if (nearLastNrBtn) nearLastNrBtn.classList.add('page-near-last');
  const lastBnt = document.querySelector('.page-' + getMaxPage(data.total_results, 20));
  if (lastBnt) lastBnt.classList.add('page-last');
  fixPaginationBtnsOnWindowChange();
};

//funkcja inicjująca paginację z opcjami
export async function createPagination(data, site, query) {
  try {
    const visiblePages = 5;
    const options = {
      totalItems: `${Math.min(10000, data.total_results)}`,
      itemsPerPage: 20,
      visiblePages: visiblePages,
      page: 1,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      template: {
        page: '<button class="tui-page-btn tui-non-selected page-{{page}}"><p class="tui-page-nr">{{page}}</p></button>',
        currentPage:
          '<button class="tui-page-btn tui-is-selected"><p class="tui-page-nr">{{page}}</p></button>',
        moveButton:
          '<button class="tui-page-btn tui-non-selected tui-{{type}}">' +
          `<div class="icon-arrow icon-arrow-{{type}} icon-arrow-1 ">${1}</div>` +
          `<div class="icon-arrow icon-arrow-{{type}} icon-arrow-hits">${getMaxPage(
            data.total_results,
            20,
          )}</div>` +
          '</button>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          `<div class="icon-arrow icon-arrow-{{type}}"></div>` +
          '</span>',
        moreButton:
          '<button class="tui-page-btn tui-non-selected tui-{{type}}-is-ellip">' +
          '<p class="tui-page-nr">...</p>' +
          '</button>',
      },
    };
    const pagination = new Pagination(paginationContainer, options);
    pagination.on('beforeMove', async event => {
      const { page } = event;
      let newPageResponse;
      if (site === 'popular') {
        newPageResponse = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
      } else if (site === 'library') {
        refreshLibrary(page);
      } else {
        newPageResponse = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
        );
      }
      if (site != 'library') {
        const movie = await newPageResponse.json();
        displayMovies(movie.results);
      }
    });
    removeExcessPaginationBtns(data);
    pagination.on('afterMove', async event => {
      removeExcessPaginationBtns(data);
    });
  } catch (error) {
    console.error(error);
  }
}
