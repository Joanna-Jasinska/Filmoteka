const URL_TRENDING = "https://api.themoviedb.org/3/trending/all/day?api_key=";
const API_KEY = "964358699754c21d74c014b561cf196c";

const paginationContainer = document.querySelector(".pagination-container")


fetch(URL_TRENDING + API_KEY)
    .then((response) => response.json())
    .then((data) => console.log(data.results))

const getPosts = () => {

}

const setPagination = () => {
    let paginationMarkup = "";
    for (let i = 1; i <= 10; i++) {
        paginationMarkup += `<button>${i}</button>`
    }
    paginationContainer.innerHTML = paginationMarkup;

    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const pageNumber = event.target.textContent;
            console.log(pageNumber);
            getFilms(pageNumber);
        })
    })
}