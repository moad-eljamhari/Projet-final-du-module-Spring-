import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username$ = this.userService.username$; // Directly bind to the observable

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  // Navigate to the recommendations page
  goToRecommendations(): void {
    this.router.navigate(['/recommendations']);
  }
 // Navigate to the showtimes page
 goToShowtimes(): void {
  this.router.navigate(['/showtimes']);
}

  // Navigate to the chatbot page
  goToChatbot(): void {
    this.router.navigate(['/chatbot']);
  }

  // Logout the user and redirect to login page
  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
