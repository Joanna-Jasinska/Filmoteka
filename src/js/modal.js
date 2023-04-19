const refs = {
  modal: document.querySelector('[data-modal]'),
  openModal: document.querySelectorAll('[data-modal-open]'),
  closeModal: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('.backdrop'),
};

refs.closeModal.addEventListener('click', toggleModal);

refs.modal.addEventListener('keydown', () => {
  if (key === 'Escape') {
    toggleModal();
  }
});

window.addEventListener('click', e => {
  if (!e.target === refs.modal) {
    toggleModal();
  }
});

export function toggleModal() {
  refs.backdrop.classList.toggle('is-hidden');
}

export const fetchMovieId = async movie_id => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=964358699754c21d74c014b561cf196c&language=en-US`,
    );
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.log(error);
  }
};
export const renderModal = movie => {
  const modalMarkup = `<div class="movie-details">
  <img
    class="movie-details__image"
    src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}"
  />
  <h2 class="movie-details__title">${movie.title}</h2>
  <ul class="movie-details__list">
    <li class="movie-details__list-element">
      <p class="movie-details__list-pararaph">
        Vote / Votes
        <span class="movie-details__average">${movie.vote_average}</span> /
        <span class="movie-details__vote-count">${movie.vote_count}</span>
      </p>
    </li>
    <li class="movie-details__list-element">
      <p class="movie-details__list-pararaph">
        Popularity <span class="movie-details__popularity">${movie.popularity}</span>
      </p>
    </li>
    <li class="movie-details__list-element">
      <p class="movie-details__list-pararaph">
        Original Title
        <span class="movie-details__original-title">${movie.original_title}</span>
      </p>
    </li>
    <li class="movie-details__list-element">
      <p class="movie-details__list-pararaph">
        Genre <span class="movie-details__genres">${movie.genres}</span>
      </p>
    </li>
  </ul>
  <h3 class="movie-details__about-title">ABOUT</h3>
  <p class="movie-details__overview">${movie.overview}</p>
  <div buttons-modal>
    <button class="buttons-modal__watched">Add to watched</button>
    <button class="buttons-modal__queue">Add to queue</button>
  </div>
</div>`;
  refs.modal.innerHTML = modalMarkup;
};
