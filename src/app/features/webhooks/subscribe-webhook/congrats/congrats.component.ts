import {Component, OnInit} from '@angular/core';
import {WebhooksContext} from "../../webhooks-context";
import {Observable} from "rxjs";
import {Topic} from "../../model/webhook-group";

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.css']
})
export class CongratsComponent implements OnInit {

  constructor(
    private readonly context: WebhooksContext
  ) {
  }

  get topic(): Observable<Topic> {
    return this.context.topic$
  }

  ngOnInit(): void {
  }

}
