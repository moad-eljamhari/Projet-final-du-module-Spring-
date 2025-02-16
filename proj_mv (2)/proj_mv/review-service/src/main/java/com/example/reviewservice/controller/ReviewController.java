package com.example.reviewservice.controller;

import com.example.reviewservice.model.Review;
import com.example.reviewservice.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:4200") // Adjust the URL to match your frontend's URL
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addReview(@RequestBody Review review) {
        try {
            // Ensure review contains the username, if not, return a bad request
            if (review.getUsername() == null || review.getUsername().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is required.");
            }

            // Save the review with username and other fields
            Review savedReview = reviewService.saveReview(review);
            return ResponseEntity.ok(savedReview);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving review.");
        }
    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<Review>> getReviewsByMovie(@PathVariable Long movieId) {
        return ResponseEntity.ok(reviewService.getReviewsByMovieId(movieId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(reviewService.getReviewsByUserId(userId));
    }

    @GetMapping("/movie/{movieId}/user/{userId}")
    public ResponseEntity<?> getReviewByMovieAndUser(@PathVariable Long movieId, @PathVariable Long userId) {
        try {
            Optional<Review> review = reviewService.getReviewByMovieAndUser(movieId, userId);
            if (review.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No review found for this movie and user.");
            }
            return ResponseEntity.ok(review);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @PutMapping("/update/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable Long reviewId, @RequestBody Review updatedReview) {
        Optional<Review> existingReview = reviewService.getReviewById(reviewId);
        if (existingReview.isPresent()) {
            Review review = existingReview.get();
            review.setRating(updatedReview.getRating());
            review.setComment(updatedReview.getComment());
            review.setUsername(updatedReview.getUsername());
            review.setGenreIds(updatedReview.getGenreIds());  // Update the genreIds as well
            reviewService.saveReview(review);
            return ResponseEntity.ok(review);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
