import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserLogout } from 'src/app/store/actions/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLogged$: Observable<boolean>;
  username$: Observable<string>;

  constructor(
      private router: Router,
      private store: Store) {
    this.isLogged$ = this.store.select(state => state.app.user.isLogged);
    this.username$ = this.store.select(state => state.app.user.user.username);
  }

  logout() {
    this.store.dispatch(new UserLogout());
    this.router.navigate(['/']);
  }
}
