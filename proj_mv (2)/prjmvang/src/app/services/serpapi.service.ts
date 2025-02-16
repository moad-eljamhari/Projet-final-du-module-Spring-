import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SerpapiService {
  private backendUrl = 'http://localhost:8911/api/showtimes/theater'; // Backend URL for theater-specific showtimes

  constructor(private http: HttpClient) {}

  // Get theater-specific showtimes
  getTheaterShowtimes(theaterName: string, location: string): Observable<any> {
    const params = new HttpParams()
      .set('theaterName', theaterName)
      .set('location', location);

    return this.http.get<any>(this.backendUrl, { params });
  }
}
