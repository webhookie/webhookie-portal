import {Component, OnInit} from '@angular/core';
import "@asyncapi/web-component/lib/asyncapi-web-component";
import {FormBuilder} from "@angular/forms";
import {debounceTime, tap} from "rxjs/operators";
import {WebhookGroupService} from "../../service/webhook-group.service";
import {RouterService} from "../../../../shared/service/router.service";
import {WebhookGroupForm} from "./webhook-group-form";

@Component({
  selector: 'app-create-webhook',
  templateUrl: './create-webhook.component.html',
  styleUrls: ['./create-webhook.component.css']
})
export class CreateWebhookComponent implements OnInit {
  editorOptions = {theme: 'vs-light', language: 'yaml'};

  webhookForm!: WebhookGroupForm;

  constructor(
    private formBuilder: FormBuilder,
    private readonly webhookGroupService: WebhookGroupService,
    private readonly router: RouterService
  ) { }

  ngOnInit(): void {
    this.webhookForm = new WebhookGroupForm(this.formBuilder);
    this.webhookForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {});
  }

  get specCode(): string {
    return this.webhookForm.spec.value;
  }

  save($event: MouseEvent) {
    let request = this.webhookForm.value;
    console.warn(request);
    this.webhookGroupService.create(request)
      .pipe(tap(it => console.warn(it)))
      .subscribe(
        () => this.router.navigateTo("/webhooks")
      );

    $event.preventDefault();
  }

  title(){
    return "Create new Webhook Group"
  }
}
