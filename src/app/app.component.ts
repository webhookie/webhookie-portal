import {Component} from '@angular/core';
import {ConfigService} from "./shared/service/config.service";
import {Spinkit} from "ng-http-loader";
import {Constants} from "./shared/constants";

@Component({
  selector: 'webhookie-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webhook';
  spinnerStyle = Spinkit;
  primaryColor!: string

  constructor(private readonly configService: ConfigService) {
    this.configService.read()
    this.primaryColor = Constants.CSS_PRIMARY_COLOR;
  }
}
