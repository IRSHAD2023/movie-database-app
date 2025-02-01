const apiKey = '4528b933'; // Replace with your OMDb API key
let currentPage = 1;
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search');
const movieList = document.getElementById('movie-list');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchMovies(query, currentPage);
    }
});

async function fetchMovies(query, page) {
    const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.Response === 'True') {
        displayMovies(data.Search);
    } else {
        movieList.innerHTML = '<p>No movies found</p>';
    }
}

function displayMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
        `;
        movieList.appendChild(movieItem);
    });
}

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchMovies(searchInput.value, currentPage);
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    fetchMovies(searchInput.value, currentPage);
});
