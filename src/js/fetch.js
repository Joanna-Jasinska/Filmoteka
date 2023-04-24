import { showLoader } from './loader';
import { initializePagination } from './pagination';
//fetching function

export const fetchPopular = async (pageNumber = 1) => {
  showLoader();
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=964358699754c21d74c014b561cf196c&page=${pageNumber}`,
  );
  //     const newPageResponse = await fetch(
  //       `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${pageNumber}`,
  //     );
  const popularMovies = await response.json();
  initializePagination(popularMovies, 'insertfunctionhere'); //dodane, żeby paginacja mogła się odpalić
  return popularMovies;
};
