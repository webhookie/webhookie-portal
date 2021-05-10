import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../shared/service/auth.service";

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.css']
})
export class ProfileIconComponent implements OnInit {

  constructor(readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  get picture(): string {
    return this.authService.claims["picture"]
  }

  get name(): string {
    return this.authService.claims["name"]
  }

  logout() {
    this.authService.logout()
  }
}
