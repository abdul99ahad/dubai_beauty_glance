import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../const/api-routes';
import { Token } from '../interfaces/token';
import { UserLogin } from '../interfaces/user-login.interface';
import { HttpService } from './http.service';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  public signIn(user: UserLogin): Observable<{ data: Token }> {
    return this.httpService.post<{ data: Token }>(ApiRoutes.signin, user);
  }

  public signUp() {}

  public setSession(authResult: Token, userData: UserLogin) {
    // const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('user_email', userData.email);
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    console.log('local storage set');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return null;
  }
}
