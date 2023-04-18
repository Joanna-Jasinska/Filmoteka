const refs = {
	modal: document.querySelector("[data-modal]"),
	openModal: document.querySelector("[data-modal-open]"),
	closeModal: document.querySelector("[data-modal-close]"),
	backdrop: document.querySelector(".backdrop"),
};
for (ref in refs) {
	console.log(ref);
}

// refs.openModal.addEventListener("click", toggleModal);
refs.closeModal.addEventListener("click", toggleModal);

export function toggleModal() {
	refs.backdrop.classList.toggle("is-hidden");
	console.log("toggle backdrop");
}

export const fetchMovieId = async (movie_id) => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}?api_key=964358699754c21d74c014b561cf196c&language=en-US`,
		);
		const movie = await response.json();
		console.log(movie);
		return movie;
	} catch (error) {
		console.log(error);
	}
};
export const renderModal = (movie) => {
	const modalMarkup = `<div class="movie-details">
    <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}">
    <h2>${movie.title}</h2>
    <p>Vote / Votes ${movie.vote_average} / ${movie.vote_count}</p>
    <p>Popularity ${movie.popularity}</p>
    <p>Original Title ${movie.original_title}</p>
    <p>Genre ${movie.genres}</p>
    <p>ABOUT ${movie.overview}</p>
    <button class="watched"> </button>
    <button class="queue"> </button>
    </div>`;
	refs.modal.innerHTML = modalMarkup;
};
