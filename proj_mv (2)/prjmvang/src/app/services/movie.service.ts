import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8085/movies'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Method to fetch popular movies
  getPopularMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/popular`);
  }

  // Method to fetch movies by title
  getMoviesByTitle(searchQuery: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/title`, { params: { title: searchQuery } });
  }

  // Method to fetch movies by genre
  getMoviesByGenre(genreId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/genre`, { params: { genreId: genreId.toString() } });
  }

  // Method to fetch movies by release date
  getMoviesByReleaseDate(startDate: string, endDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/release-date`, { params: { startDate, endDate } });
  }

  // Method to fetch movies by language
  getMoviesByLanguage(language: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/language`, { params: { language } });
  }

  // Method to fetch a movie by its ID
  getMovieById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
