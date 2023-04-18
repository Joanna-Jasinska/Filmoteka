(() => {
  const refs = {
    modal: document.querySelector('[data-modal]'),
    openModal: document.querySelector('[data-modal-open]'),
    closeModal: document.querySelector('[data-modal-close]'),
  };

  refs.openModal.addEventListener('click', toggleModal);
  refs.closeModal.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
})();

export const fetchMovieId = async(movie_id);
try {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=964358699754c21d74c014b561cf196c`,
  );
  return response.results;
} catch (error) {
  console.log(error);
}
export const renderModal = movie => {
  const modalMarkup = movie
    .map(movieDetails => {
      return ` 
    <div class="movie-details">
    <img src="https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}">
    <h2>${movieDetails.title}</h2>
    <p>Vote / Votes ${movieDetails.vote_average} / ${movieDetails.vote_count}</p>
    <p>Popularity ${movieDetails.popularity}</p>
    <p>Original Title ${movieDetails.original_title}</p>
    <p>Genre ${movieDetails.genres}</p>
    <p>ABOUT ${movieDetails.overview}</p>
    <button class="watched"> </button>
    <button class="queue"> </button>
    </div>`;
    })
    .join('');
  return modalMarkup;
};
