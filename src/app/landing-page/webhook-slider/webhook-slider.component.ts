import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from 'jquery';

@Component({
  selector: 'app-webhook-slider',
  templateUrl: './webhook-slider.component.html',
  styleUrls: ['./webhook-slider.component.css']
})
export class WebhookSliderComponent implements OnInit {
  customOptions: any = {
    loop: true,
    margin: 30,
    autoplay:true,
    responsiveClass: true,
    nav: false,
    responsive: {
      0: {
       items: 1
     },
      600: {
       items: 2
     },
      1000: {
       items: 3
     }
    },
  }

  constructor() { }

  ngOnInit(): void {
  }

}
