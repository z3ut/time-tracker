import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngxs/store';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService,
              private store: Store) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const store = this.store.snapshot();
    if (store.app.isLogged) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
