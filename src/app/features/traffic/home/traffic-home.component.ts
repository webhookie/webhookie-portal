import {Component, OnInit} from '@angular/core';
import {TraceService}from 'src/app/features/traffic/service/trace.service';
@Component({
  selector: 'app-traffic-home',
  templateUrl: './traffic-home.component.html',
  styleUrls: ['./traffic-home.component.css']
})
export class TrafficHomeComponent implements OnInit {

  constructor(public trace:TraceService) {
  }

  ngOnInit(): void {
  }

}
