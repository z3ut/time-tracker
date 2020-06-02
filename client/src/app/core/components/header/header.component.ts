import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserLogout } from 'src/app/store/actions/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Select(state => state.app.auth.isLogged) isLogged$: Observable<boolean>;
  @Select(state => state.app.auth.user.username) username$: Observable<string>;

  @Select(state => state.app.workspaceInvites.workspaceInvites.length)
  numberOfWorkspaceInvites$: Observable<number>;

  isMenuActive = false;

  constructor(
      private router: Router,
      private store: Store) { }

  logout() {
    this.isMenuActive = false;
    this.store.dispatch(new UserLogout());
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
}
