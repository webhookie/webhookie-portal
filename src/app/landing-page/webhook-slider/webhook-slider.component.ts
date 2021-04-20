import {Component, Input, OnInit} from '@angular/core';
import {WebhookGroup} from "../../features/webhooks/model/webhook-group";
import {Observable} from "rxjs";
import {OwlOptions} from "ngx-owl-carousel-o/lib/models/owl-options.model";

@Component({
  selector: 'app-webhook-slider',
  templateUrl: './webhook-slider.component.html',
  styleUrls: ['./webhook-slider.component.css']
})
export class WebhookSliderComponent implements OnInit {
  @Input() items!: Observable<Array<WebhookGroup>>

  customOptions: OwlOptions = {
    loop: true,
    margin: 30,
    autoplay:true,
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
    this.items.subscribe(it => {
      if(it.length < 3) {
        this.customOptions.loop = false;
        this.customOptions.autoplay = false;
      }
    })
  }

}
