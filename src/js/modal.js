const refs = {
  modal: document.querySelector('[data-modal]'),
  openModal: document.querySelectorAll('[data-modal-open]'),
  closeModal: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('.backdrop'),
};

refs.closeModal.addEventListener('click', () => {
  removeModal();
  refs.modal.innerHTML = '';
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    removeModal();
    refs.modal.innerHTML = '';
  }
});

window.addEventListener('click', e => {
  if (e.target === refs.backdrop) {
    removeModal();
    refs.modal.innerHTML = '';
  }
});

export function showModal() {
  refs.backdrop.classList.remove('is-hidden');
}
function removeModal() {
  refs.backdrop.classList.add('is-hidden');
}

export const fetchMovieById = async movie_id => {
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
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
  />
  <div class="movie-details__content-wrapper">
  <h2 class="movie-details__title">${movie.title}</h2>
  <ul class="movie-details__list list">
    <li class="movie-details__list-element">
      <p class="movie-details__list-paragraph">
        Vote / Votes
        <span class="movie-details__average">${movie.vote_average}</span> /
        <span class="movie-details__vote-count">${movie.vote_count}</span>
      </p>
    </li>
    <li class="movie-details__list-element">
      <p class="movie-details__list-paragraph">
        Popularity <span class="movie-details__popularity">${movie.popularity}</span>
      </p>
    </li>
    <li class="movie-details__list-element">
      <p class="movie-details__list-paragraph movie-details__list-paragraph-gap">
       <span class="no-brake">Original Title</span><span class="movie-details__original-title">${movie.original_title}</span>
      </p>
    </li>
    <li class="movie-details__list-element">
      <p class="movie-details__list-paragraph">
        Genre <span class="movie-details__genres">${movie.genres}</span>
      </p>
    </li>
  </ul>
  <h3 class="movie-details__about-title">ABOUT</h3>
  <p class="movie-details__overview">${movie.overview}</p>
  <div class="movie-details__buttons" buttons-modal>
    <button class="movie-details__button buttons-modal__watched">ADD TO WATCHED</button>
    <button class="movie-details__button buttons-modal__queue">ADD TO QUEUE</button>
  </div>
  </div>
</div>`;
  refs.modal.innerHTML = modalMarkup;
};
