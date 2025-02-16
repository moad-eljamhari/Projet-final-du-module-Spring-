import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

interface Genre {
  id: number;
  name: string;
}

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  loading: boolean = true;
  errorMessage: string = '';
  genreNames: string = '';
  genreIds: number[] = [];

  reviews: any[] = [];
  reviewText: string = '';
  rating: number = 0;
  loggedInUsername: string | null = null;
  loggedInUserId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    private viewportScroller: ViewportScroller,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);

    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.fetchMovieDetails(movieId);
      this.loadReviews(movieId);
    }

    this.userService.username$.subscribe(username => {
      this.loggedInUsername = username;
      if (this.loggedInUsername) {
        this.userService.getUserByUsername(this.loggedInUsername).subscribe({
          next: (user) => {
            this.loggedInUserId = user.id;
          },
          error: () => {
            this.showError('Failed to fetch user details.');
          }
        });
      }
    });
  }

  fetchMovieDetails(id: string): void {
    this.http
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=5e42faa74476d9b4a7e97101c3ec0830
`)
      .subscribe({
        next: (data: any) => {
          this.movie = data;
          this.genreNames = this.formatGenres(this.movie.genres);
          this.genreIds = this.movie.genres.map((g: Genre) => g.id);
          this.loading = false;
        },
        error: () => {
          this.showError('Failed to load movie details.');
        }
      });
  }

  loadReviews(movieId: string): void {
    this.http.get<any[]>(`http://localhost:8091/reviews/movie/${movieId}`).subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: () => {
        this.showError('Failed to load reviews.');
      }
    });
  }

  submitReview(): void {
    if (!this.loggedInUsername || this.loggedInUserId === null) {
      this.showWarning('Please log in to submit a review.');
      return;
    }

    if (this.rating <= 0 || this.reviewText.trim().length === 0) {
      this.showWarning('Please provide a rating and a comment.');
      return;
    }

    const reviewData = {
      movieId: this.movie.id,
      userId: this.loggedInUserId,
      username: this.loggedInUsername,
      rating: this.rating,
      comment: this.reviewText,
      genreIds: this.genreIds
    };

    const existingReview = this.reviews.find(review => review.userId === this.loggedInUserId);

    const reviewObservable = existingReview
      ? this.http.put(`http://localhost:8091/reviews/update/${existingReview.id}`, reviewData)
      : this.http.post('http://localhost:8091/reviews/add', reviewData);

    reviewObservable.subscribe({
      next: () => {
        const message = existingReview ? 'Review updated successfully!' : 'Review submitted successfully!';
        this.showSuccess(message);
        this.loadReviews(this.movie.id);
        this.reviewText = '';
        this.rating = 0;
      },
      error: (error) => {
        this.showError('Failed to submit review: ' + (error?.message || 'Unknown error.'));
      }
    });
  }

  formatGenres(genres: Genre[]): string {
    return genres.map(g => g.name).join(', ');
  }

  getStars(rating: number): string[] {
    return new Array(5).fill('star').map((_, index) => (index < rating ? 'star-filled' : 'star-empty'));
  }

  // Centralized Toastr methods
  private showSuccess(message: string): void {
    this.toastr.success(message, 'Success', { positionClass: 'toast-top-right' });
  }

  private showError(message: string): void {
    this.toastr.error(message, 'Error', { positionClass: 'toast-top-right' });
  }

  private showWarning(message: string): void {
    this.toastr.warning(message, 'Warning', { positionClass: 'toast-top-right' });
  }
}
