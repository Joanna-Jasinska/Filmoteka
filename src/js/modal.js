const refs = {
  modal: document.querySelector('[data-modal]'),
  openModal: document.querySelectorAll('[data-modal-open]'),
  closeModal: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('.backdrop'),
};

export function showModal() {
  refs.backdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', removeModalEsc);
  window.addEventListener('click', removeModalBackdrop);
  refs.closeModal.addEventListener('click', removeModal);
}
export function removeModal() {
  refs.backdrop.classList.add('is-hidden');
  refs.closeModal.removeEventListener('click', removeModal);
  window.removeEventListener('keydown', removeModalEsc);
  window.removeEventListener('click', removeModalBackdrop);
  document.querySelector('.buttons-modal__watched').removeEventListener('click', addWatchedEvent); //jak wrzucałem odwołanie się do tego elemntu dom poprzez umiejscowienie tej liniki w refs to eventy nie chciały działać
  document.querySelector('.buttons-modal__queue').removeEventListener('click', addQueueEvent);
  refs.modal.innerHTML = '';
}

function removeModalEsc(e) {
  if (e.key === 'Escape') {
    removeModal();
  }
}
function removeModalBackdrop(e) {
  if (e.target === refs.backdrop) {
    removeModal();
  }
}

function addQueueEvent(e) {
  console.log('dodano do queune');
  const data = localStorage.getItem('queue');
  let queue = JSON.parse(data);
  if (queue === null) {
    queue = [];
  } else if (queue[0] < 10) {
    const movie = queue;
    queue = [movie];
  }
  if (queue.indexOf(e.target.dataset.id) != -1) {
  } else {
    queue.push(e.target.dataset.id);
    localStorage.setItem('queue', JSON.stringify(queue));
  }
}
function addWatchedEvent(e) {
  console.log('dodano do watched');
  const data = localStorage.getItem('watched');
  let watched = JSON.parse(data);
  if (watched === null) {
    watched = [];
  } else if (watched[0] < 10) {
    const movie = watched;
    watched = [movie];
  }
  if (watched.indexOf(e.target.dataset.id) != -1) {
  } else {
    watched.push(e.target.dataset.id);
    localStorage.setItem('watched', JSON.stringify(watched));
  }
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
    class="movie-details__image" alt=" "
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
  />
  <div class="movie-details__content-wrapper">
  <h2 class="movie-details__title">${movie.title}</h2>
  <ul class="movie-details__list list">
    <li class="movie-details__list-element">
      <p class="movie-details__list-paragraph">
        Vote / Votes
        <span class="movie-details__average">${movie.vote_average.toFixed(1)}</span> /
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
       <span class="no-brake">Original Title</span><span class="movie-details__original-title">${
         movie.original_title
       }</span>
      </p>
    </li>
    <li class="movie-details__list-element">
      <p class="movie-details__list-paragraph">
        Genre <span class="movie-details__genres">${movie.genres
          .map(({ name }) => name)
          .join(', ')}</span>
      </p>
    </li>
  </ul>
  <h3 class="movie-details__about-title">ABOUT</h3>
  <p class="movie-details__overview">${movie.overview}</p>
  <div class="movie-details__buttons" buttons-modal>
    <button data-id=${
      movie.id
    } class="movie-details__button buttons-modal__watched">ADD TO WATCHED</button>
    <button data-id=${
      movie.id
    } class="movie-details__button buttons-modal__queue">ADD TO QUEUE</button>
  </div>
  </div>
</div>`;
  refs.modal.innerHTML = modalMarkup;
  document.querySelector('.buttons-modal__watched').addEventListener('click', addWatchedEvent);
  document.querySelector('.buttons-modal__queue').addEventListener('click', addQueueEvent);
};
