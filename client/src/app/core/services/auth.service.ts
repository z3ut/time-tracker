import { Injectable } from '@angular/core';
import { UserCredentials } from 'src/app/models/user-credentials';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:49998/api/v1/users/authenticate';
  private userLocalStorageKey = 'user';

  constructor(private http: HttpClient) { }

  login(credentials: UserCredentials): Observable<User> {
    return this.http.post<User>(this.apiUrl, credentials)
      .pipe(map(user => {

        if (user && user.token) {
          localStorage.setItem(this.userLocalStorageKey, JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem(this.userLocalStorageKey);
  }

  isLogged(): boolean {
    return !!localStorage.getItem(this.userLocalStorageKey);
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem(this.userLocalStorageKey));
  }
}
