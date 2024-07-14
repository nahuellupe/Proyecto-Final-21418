document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
});

function fetchMovies() {
    fetch('/movies')
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById('movie-list');
            movieList.innerHTML = '';
            data.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = `${movie.title} (Director: ${movie.director}, Genre: ${movie.genre})`;
                movieList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
}
