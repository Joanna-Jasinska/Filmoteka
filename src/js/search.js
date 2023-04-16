//pozniej komentarze zmienie na angielski

//zalozenia : w HTML wystepuje: <search-input> do wpisania slowa kluczowego, najlepiej od razu z placeholderem o treści "search for a movie";<search-button> przycisk do wyszukiwania ; <movies-container> do wyswietlania znalezionych filmow 

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

// funkcja wyświetlająca filmy na stronie , do podmiany/korekty/ dostosowania z FT07 -Zaimplementować przesyłanie popularnych filmów na główną (pierwszą) stronę

function displayMovies(movies) {
  const moviesContainer = document.getElementById('movies-container');
  moviesContainer.innerHTML = '';
  movies.forEach((movie) => {
    const movieCard = `
      <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h2>${movie.title}</h2>
        <p>${movie.release_date}</p>
        <p>${movie.overview}</p>
      </div>
    `;
    moviesContainer.insertAdjacentHTML('beforeend', movieCard);
  });
}

// funkcja obsługująca wyszukiwanie po kliknięciu przycisku, do weryfikacji nazwy przycisku jak bedzie html

async function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value;
  if (!query) return;
  const movies = await searchMovies(query);
  displayMovies(movies);
}

// nasłuchiwanie na kliknięcie buttona "Search"
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearch);
