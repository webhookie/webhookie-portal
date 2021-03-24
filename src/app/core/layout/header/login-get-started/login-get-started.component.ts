import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../shared/auth.service";

@Component({
  selector: 'app-login-get-started',
  templateUrl: './login-get-started.component.html',
  styleUrls: ['./login-get-started.component.css']
})
export class LoginGetStartedComponent implements OnInit {

  constructor(private readonly authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  login() {
    this.authService.login();
  }

  get loggedIn() {
    return this.authService.loggedIn
  }

  ngOnInit(): void {
  }

}
