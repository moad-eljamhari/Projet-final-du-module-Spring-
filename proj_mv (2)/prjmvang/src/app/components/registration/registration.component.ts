import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';  // Defining email property
  registrationError: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {  // Using onSubmit here
    if (this.password !== this.confirmPassword) {
      this.registrationError = 'Passwords do not match';
      return;
    }
    const user = { username: this.username, password: this.password, email: this.email };
    this.userService.register(user).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.registrationError = 'Registration failed';
      }
    );
  }
}
