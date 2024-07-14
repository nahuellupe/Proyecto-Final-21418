package com.example.movie.service;

import com.example.movie.model.Movie;
import java.util.List;

public interface MovieService {
    List<Movie> getAllMovies();
    Movie getMovieById(Long id);
    Movie saveMovie(Movie movie);
    void deleteMovie(Long id);
}
