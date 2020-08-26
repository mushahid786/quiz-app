import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  emailid: any;
  name: any;
  registeredUser = []
  isLogin: boolean = false;
  errorMessage: any;
  isSignUp: boolean = false;
  constructor(public router: Router, public spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (localStorage.getItem("isLogin")) {
      this.router.navigate([`/dashboard`])
    }
  }

  login() {
    console.log("UserName", this.username, "Passwrod", this.password);
    if (this.username == 'admin@admin.com' && this.password == 'pyxis@321') {
      localStorage.setItem("isLogin", 'true');
      this.errorMessage = "";
      this.router.navigate([`/dashboard`]);
    } else {
      this.errorMessage = "Please check your username and password is wrong."
    }
  }
  createNewAccount() {
    this.isSignUp = true;
  }
  signUp() {

    this.spinner.show()
    let registration = {
      name: this.name,
      username: this.emailid,
      password: this.password
    }

    this.registeredUser.push(registration);

    console.log("Total Registered User", this.registeredUser);
    setTimeout(() => {
      this.isSignUp = false;
      this.spinner.hide()
    }, 1000);

  }

}
