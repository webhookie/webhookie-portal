import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from "../../../../shared/service/auth.service";
import {JsonUtils} from "../../../../shared/json-utils";
import {ModalService} from "../../../../shared/service/modal.service";
import {ApplicationContext} from "../../../../shared/application.context";

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.css']
})
export class ProfileIconComponent implements OnInit {
  @ViewChild("resultViewer") resultViewer!: TemplateRef<any>;

  constructor(
    private readonly appContext: ApplicationContext,
    private readonly modalService: ModalService,
    readonly authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  get picture(): string {
    return this.authService.claims["picture"]
  }

  get name(): string {
    return this.authService.claims["name"]
  }

  get hasDetails(): boolean {
    return (this.name != undefined) || (this.picture != undefined)
  }

  logout() {
    this.authService.logout()
  }

  showDetails() {
    this.modalService.open(this.resultViewer);
    JsonUtils.updateElement(this.appContext.user);
  }
}
