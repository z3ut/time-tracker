import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserCredentials } from 'src/app/models/user-credentials';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: '';
  password: '';

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  register() {
    if (!this.username || !this.password) {
      alert('validate input');
      return;
    }

    const userCredentials: UserCredentials = {
      username: this.username,
      password: this.password
    };
    this.authService.register(userCredentials).subscribe(user => {
      this.router.navigate(['']);
    }, err => {
      alert(err);
    });
  }
}
