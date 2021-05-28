import {Component, OnInit} from '@angular/core';
import {ApplicationContext} from "../../../../shared/application.context";
import {WebhookGroupService} from "../../service/webhook-group.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(
    private readonly appCtx: ApplicationContext,
    readonly service: WebhookGroupService
  ) {
  }

  ngOnInit(): void {
  }

  get hasProviderRole(): boolean {
    return this.appCtx.hasProviderRole
  }

}
