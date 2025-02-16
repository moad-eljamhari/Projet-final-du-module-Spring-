import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  private apiUrl = 'http://localhost:8999/api/showtime';

  constructor(private http: HttpClient) {}

  getCineplexChains(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chains/cineplex`);
  }

  listCountries(sort?: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/countries`, { params: { sort: sort || '' } });
  }

  getCountryDetails(countryCode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/countries/${countryCode}`);
  }

  listFilms(sort?: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/films`, { params: { sort: sort || '' } });
  }

  getFilmDetails(filmId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/films/${filmId}`);
  }
  getTheatersWithFilms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/theaters-with-films`);
  }
  
}
