import {Component, Inject, OnInit} from '@angular/core';
import {ApplicationContext} from "../../shared/application.context";
import {AuthService} from "../../shared/service/auth.service";
import {HealthService} from "../../shared/service/health.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(
    @Inject("Auth") private readonly authService: AuthService,
    readonly appContext: ApplicationContext,
    private readonly healthService: HealthService
  ) {
  }

  get healthy(): Observable<boolean> {
    return this.healthService.healthy$
  }

  login() {
    this.authService.login();
  }

  ngOnInit(): void {
  }

}
