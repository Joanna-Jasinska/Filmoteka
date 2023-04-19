const URL_TRENDING = "https://api.themoviedb.org/3/search/movie?api_key=";
const API_KEY = "964358699754c21d74c014b561cf196c";

const perPage = 40; // ilość wyników na stronie
let currentPage = 1; // początkowa strona
let query = `ave` // wynik wyszukiwania

const paginationContainer = document.querySelector(".pagination-container");
const moviesContainer = document.querySelector(".movie-container");
// funkcja, która pobiera dane z API i renderuje je na stronie
async function getData() {
    try {
        const response = await fetch(`${URL_TRENDING}${API_KEY}&query=${query}&page=${currentPage}`);
        const data = await response.json();

        // obliczanie ilości stron
        const totalPages = Math.ceil(data.total_results / perPage);

        // renderowanie danych na stronie
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        const pageData = data.results.slice(startIndex, endIndex);


        pageData.forEach(movie => {
            // renderowanie pojedynczego wyniku
            let postListMarkup = "";
            postListMarkup += `
               <li>${movie.title}</li>`
                ;
            moviesContainer.innerHTML = postListMarkup;
            document.body.before(moviesContainer);
        })

        // renderowanie paginacji

        const setPagination = () => {
            let paginationMarkup = "";
            for (let i = 1; i <= totalPages; i++) {
                paginationMarkup += `<button>${i}</button>`
            }
            paginationContainer.innerHTML = paginationMarkup;

            const buttons = document.querySelectorAll("button");
            buttons.forEach((button) => {
                button.addEventListener("click", (event) => {
                    const pageNumber = event.target.textContent;
                    getData(pageNumber);
                })
            })
        }

        setPagination();
    }
    catch (error) {
        console.error(error);
    }
}

// wywołanie funkcji pobierającej dane z API i renderującej je na stronie
getData();


