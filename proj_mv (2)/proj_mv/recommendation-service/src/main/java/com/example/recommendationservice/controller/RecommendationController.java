package com.example.recommendationservice.controller;

import com.example.recommendationservice.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/recommendations")
@CrossOrigin(origins = "http://localhost:4200") // Enable CORS for the frontend's URL
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    // Endpoint to get recommendations for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getRecommendations(@PathVariable Long userId) {
        // Get the user's preferred genres
        Map<Long, Integer> userGenres = recommendationService.getUserPreferredGenres(userId);

        if (userGenres.isEmpty()) {
            return ResponseEntity.status(404).body("No recommendations available for this user.");
        }

        // Fetch movie recommendations based on the user's preferred genres
        var recommendations = recommendationService.getMovieRecommendations(userGenres);

        return ResponseEntity.ok(recommendations);
    }
}
