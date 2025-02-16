import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private apiKey = '5e42faa74476d9b4a7e97101c3ec0830';  // Replace with your TMDB API key
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  // Get popular actors
  getPopularActors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/popular?api_key=${this.apiKey}`);
  }

  // Get actor details by ID
  getActorDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/${id}?api_key=${this.apiKey}`);
  }

  // Get actor's movie credits by ID
  getActorMovies(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/${id}/movie_credits?api_key=${this.apiKey}`);
  }

  // Search actors by name
  searchActorsByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/person?api_key=${this.apiKey}&query=${name}`);
  }
}
