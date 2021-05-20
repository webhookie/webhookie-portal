import {Component, Input} from '@angular/core';
import {Webhook} from "../../../../../model/webhook";

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent {
  @Input() webhook!: Webhook
}
