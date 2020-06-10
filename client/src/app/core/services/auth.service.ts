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

  private apiAuthencticateUrl = 'api/v1.0/users/authenticate';
  private apiRegisterUrl = 'api/v1.0/users/register';
  private userLocalStorageKey = 'user';
  private behaviorSubject = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

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
    this.behaviorSubject.next(false);
  }

  isLogged(): boolean {
    try {
      const userStr = localStorage.getItem(this.userLocalStorageKey);
      if (!userStr) {
        return false;
      }
      const user = JSON.parse(userStr) as User;
      const payload = this.getTokenPayload(user.token);
      return Date.now() < payload.exp * 1000;
    } catch (e) {
      return false;
    }
  }

  getUser(): User {
    return this.isLogged() ?
      JSON.parse(localStorage.getItem(this.userLocalStorageKey)) :
      null;
  }

  saveUser(user: User) {
    if (user && user.token) {
      localStorage.setItem(this.userLocalStorageKey, JSON.stringify(user));
      this.behaviorSubject.next(true);
    }
  }

  private getTokenPayload(token: string) {
    const payload = token.split('.')[1];
    const payloadStr = atob(payload);
    return JSON.parse(payloadStr);
  }
}
