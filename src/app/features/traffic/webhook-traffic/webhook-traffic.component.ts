import { Component, OnInit } from '@angular/core';
import {TraceService} from "../service/trace.service";

@Component({
  selector: 'app-webhook-traffic',
  templateUrl: './webhook-traffic.component.html',
  styleUrls: ['./webhook-traffic.component.css']
})
export class WebhookTrafficComponent implements OnInit {

  constructor(
    private readonly traceService: TraceService
  ) { }

  ngOnInit(): void {
    this.traceService.readTraces()
      .subscribe( i => console.warn("TRACES!"))
  }

}
