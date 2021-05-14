import {Component, OnInit} from '@angular/core';
import {WebhooksContext} from "../../../../features/webhooks/webhooks-context";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private readonly ctx: WebhooksContext
  ) {
  }

  ngOnInit(): void {
  }

  clearContext() {
    this.ctx.clearWebhookSelection();
  }
}
