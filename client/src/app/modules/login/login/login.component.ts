import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserCredentials } from 'src/app/models/user-credentials';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: '';
  password: '';

  private returnUrl: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.authService.logout();

    // tslint:disable-next-line:no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (!this.username || !this.password) {
      alert('validate input');
      return;
    }

    const userCredentials: UserCredentials = {
      username: this.username,
      password: this.password
    };
    this.authService.login(userCredentials).subscribe(user => {
      this.router.navigate([this.returnUrl]);
    }, err => {
      alert(err);
    });
  }

}
