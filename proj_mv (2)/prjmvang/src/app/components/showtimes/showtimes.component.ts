import { Component, OnInit } from '@angular/core';
import { SerpapiService } from '../../services/serpapi.service';

@Component({
  selector: 'app-showtimes',
  templateUrl: './showtimes.component.html',
  styleUrls: ['./showtimes.component.css'],
})
export class ShowtimesComponent implements OnInit {
  theaterName: string = ''; 
  location: string = ''; 
  showtimes: any[] = [];
  errorMessage: string = '';
  theaters: string[] = [
    'AMC Barton Creek Square 14',
    'Cinemark Tinseltown Austin',
    'Alamo Drafthouse Cinema Brooklyn', // Added from the API response
    'IPIC Theaters', // Added from the API response
  ];
  locations: string[] = [
    'Kabul, Afghanistan',
    'Luanda, Luanda Province, Angola',
    'The Valley, Anguilla',
    'Abu Dhabi, Abu Dhabi, United Arab Emirates',
    'Ajman, Ajman, United Arab Emirates',
    'New York, NY, United States',
    'Los Angeles, CA, United States',
    'Chicago, IL, United States',
    'Miami, FL, United States',
    'Houston, TX, United States',
    'San Francisco, CA, United States',
    // Add more locations as needed
  ];

  constructor(private serpapiService: SerpapiService) {}

  ngOnInit(): void {
    this.fetchShowtimes();
  }

  fetchShowtimes(): void {
    this.errorMessage = '';
    this.showtimes = [];

    this.serpapiService.getTheaterShowtimes(this.theaterName, this.location).subscribe(
      (data) => {
        console.log('Backend response:', data);
        if (data && data.showtimes && data.showtimes.length > 0) {
          this.showtimes = data.showtimes;
        } else {
          this.errorMessage = `No showtimes found for theater: ${this.theaterName}`;
        }
      },
      (error) => {
        console.error('Error fetching showtimes:', error);
        this.errorMessage = 'Failed to fetch showtimes. Please try again.';
      }
    );
  }
}
