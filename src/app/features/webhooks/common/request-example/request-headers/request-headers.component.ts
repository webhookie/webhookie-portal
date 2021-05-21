import {Component, Input, OnInit} from '@angular/core';
import {MessageHeader} from "../../../model/message-header";
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
      .forEach(it => group[it.name] = new FormControl(it.example()))

    this.headerForm = this.formBuilder.group(group);
  }

  placeHolder(header: MessageHeader): any {
    if(header.format()) {
      return header.format()
    }

    if(header.type()) {
      return header.type()
    }
  }

  headerValue(header: MessageHeader): any {
    if(header.example()) {
      return header.example()
    }

    return this.placeHolder(header)
  }

  value(extraHeaders: any): any {
    return Object.assign(this.headerForm.value, extraHeaders);
  }
}
