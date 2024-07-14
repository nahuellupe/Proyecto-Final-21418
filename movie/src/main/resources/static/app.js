document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayMovies();
});

function fetchAndDisplayMovies() {
    fetch('/movies')
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById('movie-list');
            movieList.innerHTML = '';
            data.forEach(movie => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${movie.title}</strong> - ${movie.genre} (${movie.year})
                    <button onclick="deleteMovie(${movie.id})">Eliminar</button>
                    <button onclick="openUpdateModal(${movie.id},'${movie.title}','${movie.genre}',${movie.year})">Actualizar</button>
                `;
                movieList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function deleteMovie(movieId) {
    fetch(`/movies/${movieId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('Movie deleted successfully!');
                fetchAndDisplayMovies(); // Actualiza la lista después de eliminar
            } else {
                throw new Error('Failed to delete movie');
            }
        })
        .catch(error => {
            console.error('Error deleting movie:', error);
            alert('There was an error deleting the movie. Please try again.');
        });
}

function openUpdateModal(id, title, genre, year) {
    const modal = document.getElementById('updateMovieModal');
    modal.style.display = 'block';

    // Preparar el formulario con los datos actuales de la película
    document.getElementById('updateMovieId').value = id;
    document.getElementById('updateTitle').value = title;
    document.getElementById('updateGenre').value = genre;
    document.getElementById('updateYear').value = year;
}

document.getElementById("updateMovieForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let id = document.getElementById("updateMovieId").value;
    let title = document.getElementById("updateTitle").value;
    let genre = document.getElementById("updateGenre").value;
    let year = document.getElementById("updateYear").value;

    fetch(`/movies/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title, genre, year })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Movie updated successfully!');
            closeUpdateModal(); // Cierra el modal después de la actualización
            fetchAndDisplayMovies(); // Actualiza la lista después de la actualización
        })
        .catch(error => {
            console.error('Error updating movie:', error);
            alert('There was an error updating the movie. Please try again.');
        });
});

function openAddModal() {
    const modal = document.getElementById('addMovieModal');
    modal.style.display = 'block';

    // Limpiar formulario al abrir modal para agregar nueva película
    document.getElementById('addTitle').value = '';
    document.getElementById('addGenre').value = '';
    document.getElementById('addYear').value = '';
}

document.getElementById("addMovieForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let title = document.getElementById("addTitle").value;
    let genre = document.getElementById("addGenre").value;
    let year = document.getElementById("addYear").value;

    fetch('/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, genre, year })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Movie added successfully!');
            closeAddModal(); // Cierra el modal después de agregar la película
            fetchAndDisplayMovies(); // Actualiza la lista después de agregar la película
        })
        .catch(error => {
            console.error('Error adding movie:', error);
            alert('There was an error adding the movie. Please try again.');
        });
});

function closeAddModal() {
    const modal = document.getElementById('addMovieModal');
    modal.style.display = 'none';
}

function closeUpdateModal() {
    const modal = document.getElementById('updateMovieModal');
    modal.style.display = 'none';
}
