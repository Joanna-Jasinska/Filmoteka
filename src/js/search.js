
const API_KEY = '3453ae595a5d53cbc877c6d05de8a002'; // mój klucz API z themoviedb.org
const BASE_URL = 'https://api.themoviedb.org/3';

// funkcja wyszukująca filmy według słowa kluczowego
async function searchMovies(query) {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

// pobranie informacji o gatunku dla kazdego filmu z osobna
async function getGenres(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
}


// export?

export function displayMovies(movies) {
  const moviesContainer = document.getElementById('movies-gallery');

  
  
  moviesContainer.innerHTML = '';
  movies.forEach(async (movie) => {
    const genres = await getGenres(movie.id);
    const genreNames = genres.map((genre) => genre.name).join(', ');
    const movieCard = `
      <div class="movie-card">
      

        <img class=“movie-card__image” src=“https://image.tmdb.org/t/p/w500${movie.poster_path}” alt=“${movie.title}” width=“395" height=“574”>
        <h2 class=“movie-card__tittle”>${movie.title}</h2>
        <p class=“movie-card__info”>
        <span class=“movie-card__overview”>Genres: ${genreNames}</span> | <span class=“movie-card__realease-date”>${movie.release_date}</span>
        </p>


      </div>
    `;
    moviesContainer.insertAdjacentHTML('beforeend', movieCard);
  });
}

// funkcja obsługująca wyszukiwanie po kliknięciu przycisku, do weryfikacji nazwy przycisku jak bedzie html

async function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById('.search-form--input');
  const query = searchInput.value;
  if (!query) return;
  const movies = await searchMovies(query);
  displayMovies(movies);
}

// nasłuchiwanie na kliknięcie buttona "Search"
const searchButton = document.querySelector('.search-form--button');
searchButton.addEventListener('click', handleSearch);
