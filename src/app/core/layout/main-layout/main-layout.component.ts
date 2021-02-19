import {Component} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";

@Component({
  selector: 'webhookie-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  title = 'Webhookie';

  constructor(private readonly authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  login() {
    this.authService.login();
  }

  get loggedIn() {
    return this.authService.loggedIn
  }
}
