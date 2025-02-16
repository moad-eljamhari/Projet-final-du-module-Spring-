import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8099/users';
  private usernameSubject = new BehaviorSubject<string | null>(null);

  username$ = this.usernameSubject.asObservable(); 

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        if (response.success) {
          this.usernameSubject.next(user.username); 
          localStorage.setItem('username', user.username);
        }
      })
    );
  }

  // Updated method to fetch the user based on the username
  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${username}`);
  }

  logout(): void {
    this.usernameSubject.next(null); 
    localStorage.removeItem('username');
  }

  loadUsernameFromStorage(): void {
    const username = localStorage.getItem('username');
    this.usernameSubject.next(username);
  }
}
