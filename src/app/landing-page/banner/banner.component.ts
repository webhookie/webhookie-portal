import { Component, OnInit } from '@angular/core';
import {ApplicationContext} from "../../shared/application.context";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(readonly appContext: ApplicationContext) { }

  ngOnInit(): void {
  }

}
