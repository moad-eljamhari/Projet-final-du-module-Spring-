package com.example.recommendationservice.service;

import com.example.recommendationservice.Feing.ReviewServiceFeignClient;
import com.example.reviewservice.model.Review;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final ReviewServiceFeignClient reviewServiceFeignClient;

    public RecommendationService(ReviewServiceFeignClient reviewServiceFeignClient) {
        this.reviewServiceFeignClient = reviewServiceFeignClient;
    }

    // Calculate user preferences based on reviews
    public Map<Long, Integer> getUserPreferredGenres(Long userId) {
        // Fetch reviews for the user
        List<Review> reviews = reviewServiceFeignClient.getReviewsByUserId(userId);

        // Create a map of genre scores, assigning points based on the rating
        Map<Long, Integer> genreScores = reviews.stream()
                .filter(review -> review.getRating() >= 3) // Only consider reviews with rating >= 3
                .flatMap(review -> review.getGenreIds().stream()) // Flatten genre IDs
                .collect(Collectors.toMap(
                        genreId -> genreId,
                        genreId -> calculatePointsForRating(genreId, reviews),  // Calculate points for genre
                        Integer::sum    // If genre appears more than once, sum the points
                ));

        // Sort genres by their score in descending order and take top 3
        return genreScores.entrySet().stream()
                .sorted((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue())) // Sort by score
                .limit(3) // Take only top 3 genres
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1, // Merge function (not needed as we're not expecting duplicates after limit)
                        LinkedHashMap::new // Maintain insertion order
                ));
    }

    // Method to calculate points based on rating for each genre
    private int calculatePointsForRating(Long genreId, List<Review> reviews) {
        // We need to calculate the points for the specific genre for each review
        return reviews.stream()
                .filter(review -> review.getGenreIds().contains(genreId))  // Filter reviews by genreId
                .mapToInt(review -> {
                    int rating = review.getRating();
                    if (rating == 3) {
                        return 1;  // 3/5 = 1 point
                    } else if (rating == 4) {
                        return 2;  // 4/5 = 2 points
                    } else if (rating == 5) {
                        return 3;  // 5/5 = 3 points
                    }
                    return 0;  // No points for ratings below 3
                })
                .sum();  // Sum the points for this genre across all relevant reviews
    }

    // Fetch movie recommendations based on top 3 user genres
    public List<String> getMovieRecommendations(Map<Long, Integer> userGenres) {
        // Iterate over top user genres and build the recommendations with scores
        return userGenres.entrySet().stream()
                .map(entry -> "Movie with genre ID: " + entry.getKey() + " (Score: " + entry.getValue() + ")")  // Include genre ID and score
                .collect(Collectors.toList());
    }

}
