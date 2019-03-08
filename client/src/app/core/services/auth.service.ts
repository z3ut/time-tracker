import { Injectable } from '@angular/core';
import { UserCredentials } from 'src/app/models/user-credentials';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:49998/api/v1/users/authenticate';
  private apiRegisterUrl = 'http://localhost:49998/api/v1/users/register';
  private userLocalStorageKey = 'user';
  private behaviorSubject = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    if (this.isLogged()) {
      this.behaviorSubject.next(true);
    }
  }

  login(credentials: UserCredentials): Observable<User> {
    return this.http.post<User>(this.apiUrl, credentials)
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
    this.behaviorSubject.next(false);
    localStorage.removeItem(this.userLocalStorageKey);
  }

  isLogged(): boolean {
    return !!localStorage.getItem(this.userLocalStorageKey);
  }

  getUser(): User {
    return this.isLogged() ?
      JSON.parse(localStorage.getItem(this.userLocalStorageKey)) :
      null;
  }

  getIsLoggedObservable(): Observable<boolean> {
    return this.behaviorSubject.asObservable();
  }

  private saveUser(user: User) {
    if (user && user.token) {
      localStorage.setItem(this.userLocalStorageKey, JSON.stringify(user));
      this.behaviorSubject.next(true);
    }
  }
}
