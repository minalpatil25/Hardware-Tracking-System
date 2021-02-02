import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  server: string = "http://localhost:8080/login";
  USER_NAME_SESSION_ATTRIBUTE_NAME="authenticatedUser";
  username: string;
  password: string;
  role: string;
  username1:string;
  loginSub: Subject<any> = new Subject();
  vCode: string;

  constructor(private http:HttpClient) { }

  authenticationService(username: string, password: string) {
    return this.http.post(this.server,
      { username:username,password:password }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.role=res["role"];
        this.username1=res["username"];
        this.vCode = res["vCode"];
        //console.log(res);
        this.registerSuccessfulLogin(username, password);
        this.loginSub.next();
      }));
  }


  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }
}
