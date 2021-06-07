import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {

  constructor(
    @Inject("Auth") private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login()
  }
}
