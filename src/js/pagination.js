//import funkcji do wyświetlania filmów
// import { displayMovies } from './search';
// const Pagination = require('tui-pagination');
import Pagination from 'tui-pagination';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '964358699754c21d74c014b561cf196c';

//kontenerek na buttony z numerami stron, na które można przeskoczyć
// const paginationContainer = document.querySelector('.button-list__counter');
const paginationContainer = document.querySelector('.tui-pagination-container');

//funkcja, która oblicza ilość stron w responsie z serwera, dodaje buttony z ilością stron i event listenery, a po kliknięciu przerzuca na konkretną stronę
//wyświetlanie filmów dzieje się dzięki funkcji displayMovies() z search.js
export async function initializePagination(data, onClick = console.log) {
  try {
    if (typeof onClick != 'function') {
      console.log(
        'initializePagination(data, onClick) >> typeof onCLick ="' +
          typeof onClick +
          '", should be "function". \nonClick= ',
      );
      console.log(onClick);
      onClick = console.log;
    }
    const perPage = 20; // ilość wyników na stronie

    // obliczanie ilości stron
    const totalPages = Math.ceil(data.total_results / perPage);

    // tui-pagination
    // ---pagination new-----
    // const instance = new Pagination(container, { ... });
    // instance.getCurrentPage();

    // renderowanie paginacji
    // const setPagination = () => {
    // let paginationMarkup = '';
    // for (let i = 1; i <= totalPages; i++) {
    //   paginationMarkup += `<button id="counter">${i}</button>`;
    // }
    // paginationContainer.innerHTML = paginationMarkup;
    // const buttons = document.querySelectorAll('#counter');
    // buttons.forEach(button =>
    //   button.addEventListener('click', async event => {
    //     const pageNumber = event.target.textContent;
    //     const newPageResponse = await fetch(
    //       `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${pageNumber}`,
    //     );
    //     const movie = await newPageResponse.json();
    //     displayMovies(movie.results);
    //   })
    // );
    // };
    // setPagination();

    // const options = {
    //   totalItems: 10,
    //   itemsPerPage: 10,
    //   visiblePages: 10,
    //   page: 1,
    //   centerAlign: true,
    // };
    const options = {
      totalItems: data.total_results,
      itemsPerPage: 20,
      visiblePages: 10,
      page: 1,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="tui-page-btn tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</a>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>',
      },
    };
    const paginationInstance = new Pagination('.tui-pagination-container', options);
    console.log(paginationInstance);
    paginationInstance.on('afterMove', event => {
      const currentPage = event.page;
      console.log(`pagination, onClick(${currentPage})\n onClick= ${onClick}`);
      onClick(currentPage);
    });
  } catch (error) {
    console.error(error);
  }
}
