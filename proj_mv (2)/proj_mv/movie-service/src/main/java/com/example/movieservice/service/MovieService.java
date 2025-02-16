package com.example.movieservice.service;

import com.example.movieservice.model.Movie;
import com.example.movieservice.model.MovieResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@Service
public class MovieService {

    private static final Logger logger = LoggerFactory.getLogger(MovieService.class);

    @Value("${tmdb.api.url}")
    private String tmdbApiUrl;

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public MovieService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<Movie> getPopularMovies() {
        String url = tmdbApiUrl + "/movie/popular?api_key=" + apiKey;
        MovieResponse response = restTemplate.getForObject(url, MovieResponse.class);
        return response != null ? response.getResults() : Collections.emptyList();
    }

    public List<Movie> getMoviesByTitle(String title) {
        String url = tmdbApiUrl + "/search/movie?api_key=" + apiKey + "&query=" + title;
        MovieResponse response = restTemplate.getForObject(url, MovieResponse.class);
        return response != null ? response.getResults() : Collections.emptyList();
    }

    public List<Movie> getMoviesByGenre(int genreId) {
        String url = tmdbApiUrl + "/discover/movie?api_key=" + apiKey + "&with_genres=" + genreId;
        MovieResponse response = restTemplate.getForObject(url, MovieResponse.class);
        return response != null ? response.getResults() : Collections.emptyList();
    }

    public List<Movie> getMoviesByReleaseDate(String startDate, String endDate) {
        try {
            String url = tmdbApiUrl + "/discover/movie?api_key=" + apiKey +
                    "&primary_release_date.gte=" + startDate +
                    "&primary_release_date.lte=" + endDate;

            logger.info("Request URL for Release Date: " + url);

            MovieResponse response = restTemplate.getForObject(url, MovieResponse.class);
            return response != null ? response.getResults() : Collections.emptyList();
        } catch (Exception e) {
            logger.error("Error occurred while fetching movies by release date: ", e);
            return Collections.emptyList();
        }
    }

    // New method to get a movie by its ID
    public Movie getMovieById(int id) {
        String url = tmdbApiUrl + "/movie/" + id + "?api_key=" + apiKey;
        Movie movie = restTemplate.getForObject(url, Movie.class);

        if (movie != null) {
            // Populate genreIds from genres if genres are available
            movie.setGenreIdsFromGenres();
        }

        return movie;
    }

    public List<Movie> getMoviesByLanguage(String language) {
        String url = tmdbApiUrl + "/discover/movie?api_key=" + apiKey + "&with_original_language=" + language;
        MovieResponse response = restTemplate.getForObject(url, MovieResponse.class);
        return response != null ? response.getResults() : Collections.emptyList();
    }
}
