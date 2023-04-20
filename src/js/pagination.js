//import funkcji do wyświetlania filmów
import { displayMovies } from './search';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '964358699754c21d74c014b561cf196c';

//kontenerek na buttony z numerami stron, na które można przeskoczyć
const paginationContainer = document.querySelector('.button-list__counter');

//funkcja, która oblicza ilość stron w responsie z serwera, dodaje buttony z ilością stron i event listenery, a po kliknięciu przerzuca na konkretną stronę
//wyświetlanie filmów dzieje się dzięki funkcji displayMovies() z search.js
export async function createPagination(data, query) {
  try {
    const perPage = 40; // ilość wyników na stronie

    // obliczanie ilości stron
    const totalPages = Math.ceil(data.total_results / perPage);

    // renderowanie paginacji
    const setPagination = () => {
      let paginationMarkup = '';
      for (let i = 1; i <= totalPages; i++) {
        paginationMarkup += `<button id="counter">${i}</button>`;
      }
      paginationContainer.innerHTML = paginationMarkup;

      const buttons = document.querySelectorAll('#counter');
      buttons.forEach(button =>
        button.addEventListener('click', async event => {
          const pageNumber = event.target.textContent;
          const newPageResponse = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${pageNumber}`,
          );
          const movie = await newPageResponse.json();
          displayMovies(movie.results);
        }),
      );
    };
    setPagination();
  } catch (error) {
    console.error(error);
  }
}
