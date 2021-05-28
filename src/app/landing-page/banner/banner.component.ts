import { Component, OnInit } from '@angular/core';
import {ApplicationContext} from "../../shared/application.context";
import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    readonly appContext: ApplicationContext,
  ) {
  }

  login() {
    this.authService.login();
  }

  ngOnInit(): void {
  }

}
