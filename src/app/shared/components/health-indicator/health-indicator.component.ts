import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {HealthService} from "../../service/health.service";

@Component({
  selector: 'app-health-indicator',
  templateUrl: './health-indicator.component.html',
  styleUrls: ['./health-indicator.component.css']
})
export class HealthIndicatorComponent {
  get healthy(): Observable<boolean> {
    return this.healthService.healthy$
  }

  downReason(): Observable<string> {
    return this.healthService.downReason
  }

  constructor(
    private readonly healthService: HealthService
  ) {
    this.healthService.healthCheck()
  }
}
