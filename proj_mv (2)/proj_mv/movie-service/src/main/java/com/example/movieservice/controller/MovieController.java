package com.example.movieservice.controller;

import com.example.movieservice.model.Movie;
import com.example.movieservice.service.MovieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    // Allow requests from your Angular frontend
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/popular")
    public List<Movie> getPopularMovies() {
        return movieService.getPopularMovies();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/title")
    public List<Movie> getMoviesByTitle(@RequestParam String title) {
        return movieService.getMoviesByTitle(title);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/genre")
    public List<Movie> getMoviesByGenre(@RequestParam int genreId) {
        return movieService.getMoviesByGenre(genreId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/release-date")
    public List<Movie> getMoviesByReleaseDate(@RequestParam String startDate, @RequestParam String endDate) {
        return movieService.getMoviesByReleaseDate(startDate, endDate);
    }

    // New endpoint to get a movie by its ID
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable int id) {
        return movieService.getMovieById(id);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/language")
    public List<Movie> getMoviesByLanguage(@RequestParam String language) {
        return movieService.getMoviesByLanguage(language);
    }


}
