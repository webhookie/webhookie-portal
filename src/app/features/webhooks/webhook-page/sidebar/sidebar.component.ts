import {Component, OnInit, ViewChild} from '@angular/core';
import {ApplicationContext} from "../../../../shared/application.context";
import {SidebarListComponent} from "./sidebar-list/sidebar-list.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild("sidebarListComponent", { static: true}) sidebarListComponent!: SidebarListComponent

  constructor(private readonly appCtx: ApplicationContext) {
  }

  ngOnInit(): void {
  }

  get hasProviderRole(): boolean {
    return this.appCtx.hasProviderRole
  }

}
