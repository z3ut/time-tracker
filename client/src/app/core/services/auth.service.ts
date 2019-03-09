import { Injectable } from '@angular/core';
import { UserCredentials } from 'src/app/models/user-credentials';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { Store } from '@ngxs/store';
import { UserLogin } from 'src/app/store/actions/user-login';
import { UserLogout } from 'src/app/store/actions/user-logout';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiAuthencticateUrl = 'api/v1/users/authenticate';
  private apiRegisterUrl = 'api/v1/users/register';
  private userLocalStorageKey = 'user';
  private behaviorSubject = new BehaviorSubject(false);

  constructor(private http: HttpClient, private store: Store) {
    if (this.isLogged()) {
      this.store.dispatch(new UserLogin(this.getUser()));
      this.behaviorSubject.next(true);
    }
  }

  login(credentials: UserCredentials): Observable<User> {
    return this.http.post<User>(this.apiAuthencticateUrl, credentials)
      .pipe(map(user => {
        this.saveUser(user);
        return user;
      }));
  }

  register(credentials: UserCredentials) {
    return this.http.post<User>(this.apiRegisterUrl, credentials)
      .pipe(map(user => {
        this.saveUser(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem(this.userLocalStorageKey);
    this.store.dispatch(new UserLogout());
    this.behaviorSubject.next(false);
  }

  private isLogged(): boolean {
    return !!localStorage.getItem(this.userLocalStorageKey);
  }

  private getUser(): User {
    return this.isLogged() ?
      JSON.parse(localStorage.getItem(this.userLocalStorageKey)) :
      null;
  }

  private saveUser(user: User) {
    if (user && user.token) {
      localStorage.setItem(this.userLocalStorageKey, JSON.stringify(user));
      this.store.dispatch(new UserLogin(user));
      this.behaviorSubject.next(true);
    }
  }
}
