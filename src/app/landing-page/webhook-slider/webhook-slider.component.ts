import { Component, Input, OnInit } from '@angular/core';
import { WebhookGroup } from "../../features/webhooks/model/webhook-group";
import { Observable } from "rxjs";
import { OwlOptions } from "ngx-owl-carousel-o/lib/models/owl-options.model";
import * as $ from "jquery";
@Component({
  selector: 'app-webhook-slider',
  templateUrl: './webhook-slider.component.html',
  styleUrls: ['./webhook-slider.component.css']
})
export class WebhookSliderComponent implements OnInit {
  @Input() items!: Observable<Array<WebhookGroup>>

  // customOptions: OwlOptions = {
  //   loop: true,
  //   margin: 20,
  //   autoplay:true,
  //   nav: false,
  //   responsive: {
  //     0: {
  //      items: 1
  //    },
  //     600: {
  //      items: 2
  //    },
  //     1000: {
  //      items: 3
  //    }
  //   },
  // }
  slideConfig = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }
  constructor() { }

  ngOnInit(): void {
    this.items.subscribe(it => {
      if (it.length <= 3) {      
        // this.customOptions.loop = false;
        // this.customOptions.autoplay = false;
        this.slideConfig.dots = false;
        this.slideConfig.responsive=[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
         {
          breakpoint: 480,
          settings: {
            dots: (it.length==1)?false:true,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
         }
        ]
      }
    });
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

}
