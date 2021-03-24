import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/auth.service";

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
  }

  get givenName() {
    return this.authService.givenName
  }
}
