import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/service/auth.service";
import {HealthService} from "../../../../shared/service/health.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login-get-started',
  templateUrl: './login-get-started.component.html',
  styleUrls: ['./login-get-started.component.css']
})
export class LoginGetStartedComponent implements OnInit {

  constructor(
    @Inject("Auth") private readonly authService: AuthService,
    private readonly healthService: HealthService
  ) {
  }

  get healthy(): Observable<boolean> {
    return this.healthService.healthy$
  }

  get loggedIn() {
    return this.authService.loggedIn
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.authService.login();
  }

  ngOnInit(): void {
  }

}
