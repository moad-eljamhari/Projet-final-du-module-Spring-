import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'http://localhost:8205/api/chatbot/talk';  // Your backend API endpoint

  constructor(private http: HttpClient) {}

  talkToBot(userId: string, userMessage: string): Observable<string> {
    // Send both userId and userMessage to the backend
    return this.http.post<string>(this.apiUrl, userMessage, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams().set('userId', userId)  // Send userId as a query parameter
    });
  }
}
