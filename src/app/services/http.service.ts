import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public constructor(private readonly http: HttpClient) {}

  public loginPost(serviceName: string, data: string) {
    const header = new HttpHeaders();
    const options = {
      headers: header,
      withCredentials: false,
    };
    const url = environment.apiUrl + serviceName;
    return this.http.post(url, data, options);
  }

  public post<T>(serviceName: string, data: any, token?: string) {
    token = localStorage.getItem('token') || undefined;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    const url = environment.apiUrl + serviceName;
    return this.http.post<T>(url, data, httpOptions);
  }

  public put<T>(serviceName: string, data: any, token?: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    const url = environment.apiUrl + serviceName;
    return this.http.put<T>(url, data, httpOptions);
  }

  public get<T>(url: string, absolute: boolean = false): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    url = absolute ? url : environment.apiUrl + url;

    return this.http.get<T>(url, httpOptions);
  }

  public getWithApiKey<T>(
    url: string,
    keyName: string,
    keyValue: string
  ): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [keyName]: keyValue,
      }),
    };

    return this.http.get<T>(url, httpOptions);
  }
}
