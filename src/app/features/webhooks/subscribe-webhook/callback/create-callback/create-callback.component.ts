import { Component, OnInit } from '@angular/core';
import {VariableService} from 'src/app/features/webhooks/common/variable.service';
import {WebhooksContext} from "../../../webhooks-context";
@Component({
  selector: 'app-create-callback',
  templateUrl: './create-callback.component.html',
  styleUrls: ['./create-callback.component.css']
})
export class CreateCallbackComponent implements OnInit {

  constructor(public variable: VariableService,
    private readonly context: WebhooksContext,) { }

  ngOnInit(): void {
  }
  get selectedApplication() {
    return this.context.currentApplication
  }
  create() {
    this.variable.modalRef.hide();
  }
}
