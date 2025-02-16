import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private backendUrl = 'http://localhost:8100/recommendations/user/';  // Replace with your backend URL
  private tmdbApiKey = '5e42faa74476d9b4a7e97101c3ec0830'; // TMDB API Key
  private tmdbApiUrl = 'https://api.themoviedb.org/3/discover/movie'; // TMDB Discover Movie endpoint

  constructor(private http: HttpClient) { }

  // Method to get recommendations from the backend
  getRecommendations(userId: number): Observable<any> {
    return this.http.get<any[]>(`${this.backendUrl}${userId}`);
  }

  // Method to get movies based on genre IDs from TMDB API
  getMoviesByGenres(genreIds: number[]): Observable<any> {
    // Build the genre filter query for TMDB
    const genresQuery = genreIds.join(',');

    // Send request to TMDB to get movies based on genre IDs
    return this.http.get<any>(`${this.tmdbApiUrl}?api_key=${this.tmdbApiKey}&with_genres=${genresQuery}`);
  }
}
