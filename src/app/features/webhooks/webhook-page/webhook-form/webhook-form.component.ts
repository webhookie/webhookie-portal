import {Component, Input, OnInit, ViewChild} from '@angular/core';
import "@asyncapi/web-component/lib/asyncapi-web-component";
import {switchMap, take} from "rxjs/operators";
import {WebhookApiForm} from "./webhook-api-form";
import {WebhookieError} from "../../../../shared/error/webhookie-error";
import {WebhookAccessGroupComponent} from "./webhook-access-group/webhook-access-group.component";
import {DropdownEntry} from "../../../../shared/model/dropdownEntry";
import {ApplicationContext} from "../../../../shared/application.context";
import {Observable} from "rxjs";
import {WebhookApi} from "../../model/webhook-api";

@Component({
  selector: 'app-webhook-form',
  templateUrl: './webhook-form.component.html',
  styleUrls: ['./webhook-form.component.css']
})
export class WebhookFormComponent implements OnInit {
  editorOptions = {theme: 'vs-light', language: 'yaml'};

  error: WebhookieError | null = null;
  isCollapsed: boolean = true;

  @ViewChild("consumerGroupsComponent") consumerGroupsComponent!: WebhookAccessGroupComponent
  @ViewChild("providerGroupsComponent") providerGroupsComponent!: WebhookAccessGroupComponent
  @Input() webhookForm!: WebhookApiForm;
  @Input() formTitle!: string
  @Input() onSave!: (request: any) => Observable<WebhookApi>
  @Input() onSuccess!: (value: WebhookApi) => void;

  constructor(
    private readonly appCtx: ApplicationContext,
  ) { }

  ngOnInit(): void {
    this.webhookForm.form.statusChanges
      .subscribe(it => {
        if(it == "INVALID") {
          this.updateError(this.webhookForm.errors());
        } else {
          this.clearError();
        }
      });

    this.webhookForm.form.valueChanges
      .pipe(take(1))
      .subscribe(() => {
        this.providerGroupsComponent.init(this.webhookForm.providerGroups.value)
        this.consumerGroupsComponent.init(this.webhookForm.consumerGroups.value)
      });
  }

  get specCode(): string {
    return this.webhookForm.spec.value;
  }

  save($event: MouseEvent) {
    this.clearError();
    this.webhookForm.value()
      .pipe(switchMap(it => this.onSave(it)))
      .subscribe(
        it => this.onSuccess(it),
        (err: WebhookieError) => this.updateError(err)
      );
    $event.preventDefault();
  }

  title(){
    return this.formTitle ?  this.formTitle : ""
  }

  updateError(err: WebhookieError | null) {
    this.error = err;
    this.isCollapsed = false;
  }

  clearError() {
    this.error = null;
    this.isCollapsed = true;
  }

  providerGroupFilter(): (entry: DropdownEntry) => boolean {
    return this.appCtx.providerGroupFilter();
  }
}
