import { Component, OnInit } from '@angular/core';
import {WebhooksContext} from "../../webhooks-context";

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.css']
})
export class CongratsComponent implements OnInit {

  constructor(
    private readonly context: WebhooksContext
  ) { }

  ngOnInit(): void {
  }

  get topic() {
    return this.context.selectedTopic?.name
  }

}
