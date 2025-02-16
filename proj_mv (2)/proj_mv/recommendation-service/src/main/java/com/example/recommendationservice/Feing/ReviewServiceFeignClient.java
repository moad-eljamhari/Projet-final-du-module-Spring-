package com.example.recommendationservice.Feing;

import com.example.reviewservice.model.Review;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "review-service", url = "http://localhost:8091") // Update with actual URL of ReviewService
public interface ReviewServiceFeignClient {

    @GetMapping("/reviews/movie/{movieId}")
    List<Review> getReviewsByMovieId(@PathVariable("movieId") Long movieId);

    @GetMapping("/reviews/user/{userId}")
    List<Review> getReviewsByUserId(@PathVariable("userId") Long userId);
}
