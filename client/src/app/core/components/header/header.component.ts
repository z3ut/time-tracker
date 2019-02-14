import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name = '';
  isLogged = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getIsLoggedObservable().subscribe(isLogged => {
      this.isLogged = isLogged;
      this.name = isLogged ?
        this.authService.getUser().name :
        '';
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
