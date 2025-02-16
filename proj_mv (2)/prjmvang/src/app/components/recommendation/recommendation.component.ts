import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../../services/recommendation.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  recommendedMovies: any[] = [];
  topGenres: string = '';
  errorMessage: string = '';
  userId: number | null = null;

  // Map of genre IDs to genre names
  private genreMap: { [key: number]: string } = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  constructor(
    private recommendationService: RecommendationService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the username from UserService
    this.userService.username$.subscribe({
      next: (username) => {
        if (username) {
          // Fetch the user details using the username
          this.userService.getUserByUsername(username).subscribe({
            next: (user) => {
              this.userId = user.id;  // Assuming the user object has an 'id' field
              this.fetchRecommendations();  // Fetch recommendations after user ID is set
            },
            error: () => {
              this.errorMessage = 'Failed to fetch user details.';
            }
          });
        } else {
          this.errorMessage = 'User not logged in.';
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load username.';
      }
    });
  }

  fetchRecommendations(): void {
    if (this.userId !== null) {
      // Fetch genre recommendations from the backend
      this.recommendationService.getRecommendations(this.userId).subscribe({
        next: (response: any[]) => {
          if (response && response.length > 0) {
            // Extract genre IDs and scores from the response
            const genreScores: number[] = response.map((item) => {
              const match = item.match(/genre ID: (\d+)/);
              return match ? parseInt(match[1], 10) : null;
            }).filter((id) => id !== null) as number[]; // Ensure that the type is number[]

            // Map genre IDs to their names
            const genreNames = genreScores.map(id => this.genreMap[id] || 'Unknown').join(', ');

            // Set the topGenres to display the genre names
            this.topGenres = genreNames;

            // Fetch movies based on these genres
            this.recommendationService.getMoviesByGenres(genreScores).subscribe({
              next: (moviesData) => {
                if (moviesData.results) {
                  this.recommendedMovies = moviesData.results; // Store the list of recommended movies
                }
              },
              error: (error) => {
                this.errorMessage = 'Failed to fetch movie recommendations from TMDB.';
              }
            });
          }
        },
        error: () => {
          this.errorMessage = 'Failed to fetch genre recommendations from backend.';
        }
      });
    }
  }
}
