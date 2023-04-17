import { showLoader } from './loader';
//fetching function
export const fetchPopular = async () => {
  showLoader();
  const response = await fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=964358699754c21d74c014b561cf196c',
  );
  const popularMovies = await response.json();
  return popularMovies;
};
