package com.example.reviewservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.reviewservice.DTO.Movie;  // Create a Movie DTO for this

@FeignClient(name = "movie-service")
public interface MovieFeignClient {
    @GetMapping("/movies/{id}")
    Movie getMovieById(@PathVariable("id") Long id);
}
