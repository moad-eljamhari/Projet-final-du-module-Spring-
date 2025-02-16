import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private newsApiKey  = 'b14e567fea814e07adf27ed44b211948'; // Use your actual NewsAPI key
  private apiUrl = 'https://newsapi.org/v2/everything';

  constructor(private http: HttpClient) {}

  // Fetch latest movie news (from NewsAPI or similar)
  getLatestMovieNews(): Observable<any> {
    const url = `https://newsapi.org/v2/everything?q=movie&apiKey=${this.newsApiKey}`;
    return this.http.get<any>(url);
  }

  // Fetch latest TV series news (Use a relevant API or service for TV shows)
  getLatestTvNews(): Observable<any> {
    const url = `https://newsapi.org/v2/everything?q=tv%20show&apiKey=${this.newsApiKey}`;
    return this.http.get<any>(url);
  }

  // Fetch latest anime news (Use Jikan API for anime news)
  getLatestAnimeNews(): Observable<any> {
    const url = `https://api.jikan.moe/v4/anime/news`;  // Jikan's anime news endpoint
    return this.http.get<any>(url);
  }

  // Filter articles based on removed content or unwanted keywords
  filterArticles(articles: any[]): any[] {
    const excludedKeywords = ['removed', 'deleted'];  // Add more keywords as needed
    return articles.filter(article => {
      return !excludedKeywords.some(keyword => article.title.toLowerCase().includes(keyword) || article.description.toLowerCase().includes(keyword));
    });
  }
}
