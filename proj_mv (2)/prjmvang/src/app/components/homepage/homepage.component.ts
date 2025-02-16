import { Component, OnInit, HostListener } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { NewsService } from '../../services/news.service'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  movies: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  searchQuery: string = '';
  searchType: string = 'title';  // Default search type is by title
  selectedGenre: number | null = null;
  selectedYear: string | null = null;   // Year can be a string or null
  selectedLanguage: string | null = null;  // Language selection
  news: any[] = [];  // To hold news articles
  newsLoading: boolean = true;

  // Chatbot state
  isChatbotOpen = false;
  userInput: string = '';
  messages: { text: string }[] = [{ text: 'Hello! How can I help you today?' }];
  chatbotPosition = { x: 0, y: 0 };
  isDragging = false;

  // Example of available genres (30 genres)
  genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
    { id: 99, name: 'Documentary' },
    { id: 36, name: 'History' },
    { id: 16, name: 'Animation' },
    { id: 9648, name: 'Mystery' }
  ];

  // Example of available years (50 years from 1974 to 2023)
  years = Array.from({ length: 130 }, (_, i) => (2024 - i).toString());

  // Example of available languages (30 languages)
  languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ru', name: 'Russian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'tr', name: 'Turkish' },
    { code: 'pl', name: 'Polish' },
    { code: 'sv', name: 'Swedish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'cs', name: 'Czech' },
    { code: 'el', name: 'Greek' },
    { code: 'th', name: 'Thai' },
    { code: 'da', name: 'Danish' },
    { code: 'no', name: 'Norwegian' },
    { code: 'fi', name: 'Finnish' },
    { code: 'he', name: 'Hebrew' },
    { code: 'ro', name: 'Romanian' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'sk', name: 'Slovak' },
    { code: 'id', name: 'Indonesian' },
    { code: 'ms', name: 'Malay' },
    { code: 'bn', name: 'Bengali' }
  ];

  constructor(private movieService: MovieService, private newsService: NewsService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadPopularMovies();
    this.loadLatestMovieNews();  
  }

  // Method to load popular movies
  loadPopularMovies() {
    this.movieService.getPopularMovies().subscribe(
      (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch popular movies. Please try again later.';
        this.loading = false;
      }
    );
  }

  loadLatestMovieNews() {
    this.newsService.getLatestMovieNews().subscribe(
      (response) => {
        this.news = response.articles
          .filter((article: { title: any; urlToImage: string; publishedAt: any; }) => 
            article.title && 
            article.urlToImage && article.urlToImage.startsWith('http') &&
            article.publishedAt
          )
          .slice(0, 4);
        this.newsLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch latest movie news. Please try again later.';
        this.newsLoading = false;
      }
    );
  }
  // Method to get genre names based on genre IDs
  getGenreNames(genreIds: number[]): string {
    return genreIds
      .map(id => {
        const genre = this.genres.find(g => g.id === id);
        return genre ? genre.name : 'Unknown'; // Return 'Unknown' if genre not found
      })
      .join(', '); // Join all genre names with a comma
  }

  // Method to handle the search based on selected type
  searchMovies() {
    this.loading = true;
    if (this.searchType === 'title') {
      this.searchByTitle();
    } else if (this.searchType === 'genre') {
      this.searchByGenre();
    } else if (this.searchType === 'releaseDate') {
      this.searchByReleaseDate();
    } else if (this.searchType === 'language') {
      this.searchByLanguage();
    }
  }

  // Method to search movies by title
  searchByTitle() {
    this.movieService.getMoviesByTitle(this.searchQuery).subscribe(
      (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch movies by title. Please try again later.';
        this.loading = false;
      }
    );
  }

  // Method to search movies by genre
  searchByGenre() {
    const genreId = this.selectedGenre;
    if (!genreId) {
      this.errorMessage = 'Please select a genre.';
      this.loading = false;
      return;
    }
    this.movieService.getMoviesByGenre(genreId).subscribe(
      (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch movies by genre. Please try again later.';
        this.loading = false;
      }
    );
  }

  // Method to search movies by release date (Year)
  searchByReleaseDate() {
    if (!this.selectedYear) {
      this.errorMessage = 'Please select a year.';
      this.loading = false;
      return;
    }
    const startDate = `${this.selectedYear}-01-01`;
    const endDate = `${this.selectedYear}-12-31`;

    console.log(`Fetching movies from ${startDate} to ${endDate}`);

    this.movieService.getMoviesByReleaseDate(startDate, endDate).subscribe(
      (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch movies by release date. Please try again later.';
        this.loading = false;
      }
    );
  }

  // Method to search movies by language
  searchByLanguage() {
    if (!this.selectedLanguage) {
      this.errorMessage = 'Please select a language.';
      this.loading = false;
      return;
    }
    this.movieService.getMoviesByLanguage(this.selectedLanguage).subscribe(
      (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch movies by language. Please try again later.';
        this.loading = false;
      }
    );
  }

  // Navigate to the movie detail page
  viewMovieDetail(id: number): void {
    this.router.navigate(['/movie', id]);
  }

  // Toggle the chatbot window
  toggleChatbot() {
    this.isChatbotOpen = !this.isChatbotOpen;
    if (this.isChatbotOpen) {
      this.messages.push({ text: 'Hello! How can I assist you with movie recommendations?' });
    }
  }

// Send message to chatbot API
sendMessage() {
  if (!this.userInput.trim()) return;
  
  const userMessage = this.userInput.trim();
  this.messages.push({ text: userMessage });
  this.userInput = ''; // Clear input field

  // Send the message to the chatbot API
  this.http.post<{ message: string }>('http://localhost:8200/api/chatbot/ask', userMessage, {
    headers: { 'Content-Type': 'application/json' }
  }).subscribe(
    (response) => {
      this.messages.push({ text: response.message });
    },
    (error) => {
      this.messages.push({ text: 'Sorry, something went wrong. Please try again later.' });
    }
  );
}


  // Handle dragging of the chatbot window
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.target && (event.target as HTMLElement).classList.contains('chatbot-header')) {
      this.isDragging = true;
      this.chatbotPosition = { x: event.clientX, y: event.clientY };
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.chatbotPosition = {
        x: event.clientX,
        y: event.clientY
      };
    }
  }

  @HostListener('mouseup', [])
  onMouseUp() {
    this.isDragging = false;
  }
}
