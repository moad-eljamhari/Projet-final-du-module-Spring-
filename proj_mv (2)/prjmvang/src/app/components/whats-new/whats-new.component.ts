import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './whats-new.component.html',
  styleUrls: ['./whats-new.component.css']
})
export class NewsComponent implements OnInit {
  news: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadLatestMovieNews();
  }

  loadLatestMovieNews() {
    this.newsService.getLatestMovieNews().subscribe(
      (response) => {
        // Filter out articles with "Removed" in the title or image field
        this.news = response.articles.filter((article: { title: string | string[]; image: any; }) => 
          !article.title.includes('Removed') && 
          !article.image &&  // Assuming 'image' field contains the article image
          article.title !== ''); // Example condition for empty titles, add more as needed
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch latest movie news. Please try again later.';
        this.loading = false;
      }
    );
  }
}
