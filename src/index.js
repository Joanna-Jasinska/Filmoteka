import './sass/main.scss';
import { fetchPopular } from './fetch';
//

fetchPopular()
  .then(popularMovies => console.log(popularMovies))
  .catch(error => console.error(error));
