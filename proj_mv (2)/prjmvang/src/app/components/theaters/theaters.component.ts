import { Component, OnInit } from '@angular/core';
import { ShowtimeService } from '../../services/showtime.service';

@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.css']
})
export class TheatersComponent implements OnInit {
  theaters: any[] = [];

  constructor(private showtimeService: ShowtimeService) {}

  ngOnInit(): void {
    this.fetchTheatersWithFilms();
  }

  fetchTheatersWithFilms() {
    this.showtimeService.getTheatersWithFilms().subscribe((data) => {
      this.theaters = data;
    });
  }
}
