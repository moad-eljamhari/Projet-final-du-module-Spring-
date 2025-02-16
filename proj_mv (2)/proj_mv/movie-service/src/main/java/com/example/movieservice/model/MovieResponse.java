package com.example.movieservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class MovieResponse {
    @JsonProperty("results")
    private List<Movie> results;
}
