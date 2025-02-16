import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    console.log('Submitting login with:', this.username, this.password);
    const user = { username: this.username, password: this.password };
  
    this.userService.login(user).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        if (response.success) {
          this.router.navigate(['/home']);
        } else {
          this.loginError = 'Invalid username or password';
        }
      },
      error: (error) => {
        console.error('Login Error:', error);
        this.loginError = 'An error occurred during login. Please try again.';
      },
    });
  }
  
}
