package com.example.movieservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {

    @JsonProperty("adult")
    private boolean adult;

    @JsonProperty("backdrop_path")
    private String backdropPath;

    @JsonProperty("genres")
    private List<Genre> genres;  // New field to hold the full genre objects

    @JsonProperty("genre_ids")
    private List<Integer> genreIds;  // Keep this field to store only the genre IDs

    @JsonProperty("id")
    private int id;

    @JsonProperty("original_language")
    private String originalLanguage;

    @JsonProperty("original_title")
    private String originalTitle;

    @JsonProperty("overview")
    private String overview;

    @JsonProperty("popularity")
    private double popularity;

    @JsonProperty("poster_path")
    private String posterPath;

    @JsonProperty("release_date")
    private String releaseDate;

    @JsonProperty("title")
    private String title;

    @JsonProperty("video")
    private boolean video;

    @JsonProperty("vote_average")
    private double voteAverage;

    @JsonProperty("vote_count")
    private int voteCount;

    // Add the Genre class to hold the genre data
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Genre {
        private int id;
        private String name;
    }

    public void setGenreIdsFromGenres() {
        if (genres != null) {
            this.genreIds = genres.stream()
                    .map(Genre::getId)
                    .collect(Collectors.toList());
        }
    }
}
