import "./sass/main.scss";
import debounce from "lodash/debounce";
import { fetchPopular } from "./js/fetch";
import { removeLoader } from "./js/loader";
import { displayMovies } from "./js/search";

import "./js/pagination";
import "./js/modal-devs";

import {
	createPagination,
	fixPaginationBtnsOnWindowChange,
} from "./js/pagination";

(async () => {
	try {
		const popularMovies = await fetchPopular();

		const movies = popularMovies.results;
		displayMovies(movies);
		createPagination(popularMovies, "popular");
		removeLoader();
	} catch (error) {
		console.error(error);
		removeLoader();
	}
	window.addEventListener(
		"resize",
		debounce(fixPaginationBtnsOnWindowChange, 30),
	);
})();
