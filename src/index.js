import "./sass/main.scss";
import { fetchPopular } from "./js/fetch";
import { removeLoader, initLoader } from "./js/loader";
import { displayMovies } from "./js/search";
import { fetchMovieId } from "./js/modal";
import { renderModal } from "./js/modal";

const moviesContainer = document.getElementById("movies-container");

initLoader();

//fech danych z serwera każdorazowo odpala>>>
// showLoader();

// spełnienie promise/pobranie danych  z serwera(tutaj zastąpione timeoutem)>>>
// setTimeout(() => {
//   removeLoader();
// }, 2000);

fetchPopular()
	.then((popularMovies) => {
		// console.log(popularMovies.results);
		const movies = popularMovies.results;
		displayMovies(movies);
	})
	.catch((error) => console.error(error))
	.finally(() => {
		removeLoader();
	});
fetchMovieId(594767).then((movie) => {
	const markup = renderModal(movie);
	// console.log(markup);
});
