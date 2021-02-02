import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  server: string = "http://localhost:8080";
  show=false;
  constructor(private http: HttpClient) { }

  get(uri: string, id?: number): Observable<any> {
    let url = this.server + uri;
    if (id) {
      url = url + '/' + id;
    }

    return this.http.get(url);
  }

  post(uri: string, ele: any): Observable<any> {
    let url = this.server + uri;
    return this.http.post(url, ele);
  }

  put(uri: string, id: number, ele: any): Observable<any> {
    
    let url = this.server + uri + '/' + id;
    return this.http.put(url, ele);
  }

  delete(uri: string, id: number): Observable<any> {
    let url = this.server + uri + '/' + id;
    return this.http.delete(url);
  }
}
