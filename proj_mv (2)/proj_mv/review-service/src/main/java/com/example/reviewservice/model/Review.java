package com.example.reviewservice.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "movie_id")
    private Long movieId;

    @Column(name = "user_id")
    private Long userId;

    private int rating;

    @Column(name = "comment")
    private String comment;

    @Column(name = "username")
    private String username;

    @ElementCollection  // Indicates a collection of simple types
    @CollectionTable(name = "review_genre_ids", joinColumns = @JoinColumn(name = "review_id"))
    @Column(name = "genre_id")
    private List<Long> genreIds;  // Store genre IDs as a list of Longs

    // Constructors, getters, and setters
    public Review() {}

    public Review(Long movieId, Long userId, int rating, String comment, String username, List<Long> genreIds) {
        this.movieId = movieId;
        this.userId = userId;
        this.rating = rating;
        this.comment = comment;
        this.username = username;
        this.genreIds = genreIds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Long> getGenreIds() {
        return genreIds;
    }

    public void setGenreIds(List<Long> genreIds) {
        this.genreIds = genreIds;
    }
}
