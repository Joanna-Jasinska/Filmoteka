import { toggleModal, fetchMovieId, renderModal } from "./modal";
import { showLoader, removeLoader } from "./loader";

//pozniej komentarze zmienie na angielski

const API_KEY = "3453ae595a5d53cbc877c6d05de8a002"; // mój klucz API z themoviedb.org
const BASE_URL = "https://api.themoviedb.org/3";

// funkcja wyszukująca filmy według słowa kluczowego
async function searchMovies(query) {
	try {
		const response = await fetch(
			`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
		);
		const data = await response.json();
		return data.results;
	} catch (error) {
		console.error(error);
	}
}

// funkcja wyświetlająca filmy na stronie , do podmiany/korekty/ dostosowania z FT07 -Zaimplementować przesyłanie popularnych filmów na główną (pierwszą) stronę

export function displayMovies(movies) {
	console.log(movies);
	const moviesContainer = document.getElementById("movies-container");
	moviesContainer.innerHTML = "";
	movies.forEach((movie) => {
		const movieCard = `
        <div class="movie-card" data-modal-open>
          <img data-id=${movie.id} src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" width="395" height="574">
          <h2>${movie.title}</h2>
          <p>${movie.release_date}</p>
          <p>${movie.overview}</p>
        </div>`;

		moviesContainer.insertAdjacentHTML("beforeend", movieCard);
	});
	moviesContainer.addEventListener("click", (e) => {
		console.log(e.target.tagName);
		if (e.target.tagName === "IMG") {
			console.log(e.target.dataset.id);
			showLoader();
			toggleModal();
			fetchMovieId(e.target.dataset.id).then((movie) => {
				renderModal(movie);
				removeLoader();
			});
		}
	});
}

// funkcja obsługująca wyszukiwanie po kliknięciu przycisku, do weryfikacji nazwy przycisku jak bedzie html

async function handleSearch(event) {
	event.preventDefault();
	const searchInput = document.getElementById(".search-form--input");
	const query = searchInput.value;
	if (!query) return;
	const movies = await searchMovies(query);
	displayMovies(movies);
}

// nasłuchiwanie na kliknięcie buttona "Search"
const searchButton = document.querySelector(".search-form--button");
searchButton.addEventListener("click", handleSearch);
