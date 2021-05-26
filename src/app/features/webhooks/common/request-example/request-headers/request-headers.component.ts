import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Webhook} from "../../../model/webhook";

@Component({
  selector: 'app-request-headers',
  templateUrl: './request-headers.component.html',
  styleUrls: ['./request-headers.component.css']
})
export class RequestHeadersComponent implements OnInit {
  @Input() webhook!: Webhook
  @Input() show!: boolean
  headerForm!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const group: any = {};

    this.webhook.headers.values
      .filter(it => it.isEditable())
      .forEach(it => group[it.name] = new FormControl(it.example()))

    this.headerForm = this.formBuilder.group(group);
  }

  value(extraHeaders: any): any {
    let extra = Object.assign(extraHeaders, this.webhook.contentTypeHeader());
    return Object.assign(this.headerForm.value, extra);
  }
}
