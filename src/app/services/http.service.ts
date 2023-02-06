import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  loginPost(serviceName: string, data: string) {
    const header = new HttpHeaders();
    const options = {
      headers: header,
      withCredintials: false
    };
    const url = environment.apiUrl + serviceName;
    return this.http.post(url, data, options);
  }

  post<T>(serviceName: string, data: string, token?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    };
    const url = environment.apiUrl + serviceName;
    return this.http.post<T>(url, data, httpOptions);
  }

  put<T>(serviceName: string, data: any, token?: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    };
    const url = environment.apiUrl + serviceName;
    return this.http.put<T>(url, data, httpOptions);
  }

  get<T>(serviceName: string, absolute: boolean = false): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    let url = absolute ? serviceName : environment.apiUrl + serviceName;

    return this.http.get<T>(url, httpOptions);
  }
}
