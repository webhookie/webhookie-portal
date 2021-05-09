import {Component} from '@angular/core';
import {ConfigService} from "./shared/service/config.service";
import {Spinkit} from "ng-http-loader";

@Component({
  selector: 'webhookie-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webhook';
  spinnerStyle = Spinkit;
  constructor(private readonly configService: ConfigService) {
    this.configService.read()
  }
}
