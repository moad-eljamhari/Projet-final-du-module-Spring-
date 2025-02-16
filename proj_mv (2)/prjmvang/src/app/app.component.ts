import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showNavbar: boolean = true; // Control navbar visibility

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide navbar on login and register pages
        this.showNavbar = !(event.url === '/login' || event.url === '/register');
      }
    });
  }
  get isAuthPage() {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
