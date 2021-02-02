import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { HttpService } from 'src/app/service/http-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  


  constructor(public authService:AuthServiceService,private router:Router,public httpService:HttpService) { 
    
  }
  
  ngOnInit(): void {
    //this.httpService.show = true;
  }

  login(){
    this.authService.authenticationService(this.username, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.httpService.show=true;
      //console.log(result);
      if(this.authService.role == "admin"){
        this.router.navigate(['/admin/branch']);
      }
      if(this.authService.role == "user"){
        this.router.navigate(['/user/maintenance']);
      }
      if(this.authService.role == "vender"){
        this.router.navigate(['/vendor/quotationresponse']);
      }
     
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });    
  }

  
}
