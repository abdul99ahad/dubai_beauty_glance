import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiRoutes } from '../const/api-routes';
import { Token } from '../interfaces/token';
import { UserLogin } from '../interfaces/user-login.interface';
import { HttpService } from './http.service';
import moment from 'moment';
import { UserRegister } from '../interfaces/user-register.interface';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUserLoggedInSubject = new BehaviorSubject<string>('');
  navItem$ = this.isUserLoggedInSubject.asObservable();

  constructor(
    private readonly httpService: HttpService,
    private jwtHelper: JwtHelperService
  ) {}

  public signIn(user: UserLogin): Observable<{ data: Token }> {
    return this.httpService.post<{ data: Token }>(ApiRoutes.signin, user);
  }

  public signUp(user: UserRegister) {
    return this.httpService.post<{ data: Token }>(ApiRoutes.signup, user);
  }

  public setSession(authResult: Token, userData: UserLogin) {
    // const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('user_email', userData.email);
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    this.isUserLoggedInSubject.next(userData.email);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
  }

  public isUserLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  // public isLoggedIn() {
  //   return moment().isBefore(this.getExpiration());
  // }

  // isLoggedOut() {
  //   return !this.isLoggedIn();
  // }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return null;
  }
}
