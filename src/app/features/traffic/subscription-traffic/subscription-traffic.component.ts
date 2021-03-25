import { Component, OnInit } from '@angular/core';
import {SpanService} from "../service/span.service";

@Component({
  selector: 'app-subscription-traffic',
  templateUrl: './subscription-traffic.component.html',
  styleUrls: ['./subscription-traffic.component.css']
})
export class SubscriptionTrafficComponent implements OnInit {

  constructor(
    private readonly spanService: SpanService,
  ) { }

  ngOnInit(): void {
    this.spanService.readSpans()
      .subscribe( i => console.warn("SPANS!"))
  }
}
