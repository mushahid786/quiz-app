import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: any = "";
  password: any = "";
  emailid: any = "";
  name: any = "";
  registeredUser: any = [];
  isLogin: boolean = false;
  isValidEmail: boolean = false;
  errorMessage: any;
  isSignUp: boolean = false;
  constructor(public router: Router, public spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    if (localStorage.getItem("isLogin")) {
      this.router.navigate([`/dashboard`])
    }
  }

  login() {
    this.isLogin = true;
    let storedRegisteredUsers = JSON.parse(localStorage.getItem("registeredUser"));

    console.log("Registered User", storedRegisteredUsers);
    for (let i = 0; i < storedRegisteredUsers.length; i++) {
      if ((this.username == storedRegisteredUsers[i].username) && (this.password == storedRegisteredUsers[i].password)) {
        localStorage.setItem("isLogin", 'true');
        localStorage.setItem("username", this.username);
        this.errorMessage = "";
        this.router.navigate([`/dashboard`]);
      } else if (this.username != "" && this.password != "") {
        this.errorMessage = "Please check your username and password is wrong."
      }
    }
  }

  createNewAccount() {
    this.isSignUp = true;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  signUp() {

    if (this.name == "" || this.emailid == "" || this.password == "") {
      this.isLogin = true;
      return
    }
    if (!this.validateEmail(this.emailid)) {
      this.isLogin = true
      this.isValidEmail = true;
      return;
    }
    this.spinner.show()
    let registration = {
      name: this.name,
      username: this.emailid,
      password: this.password
    }

    this.registeredUser.push(registration);
    localStorage.setItem("registeredUser", JSON.stringify(this.registeredUser));
    console.log("Total Registered User", localStorage.getItem("registeredUser"));
    setTimeout(() => {
      this.isSignUp = false;
      this.spinner.hide()
    }, 1000);

  }

}
