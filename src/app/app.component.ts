import {Component} from '@angular/core';
import {ConfigService} from "./shared/config.service";

@Component({
  selector: 'webhookie-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private readonly configService: ConfigService) {
    this.configService.read()
  }
}
