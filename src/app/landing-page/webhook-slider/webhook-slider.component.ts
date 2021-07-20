import {Component, Input, OnInit} from '@angular/core';
import {WebhookApi} from "../../features/webhooks/model/webhook-api";
import {Observable} from "rxjs";
import {WebhooksContext} from "../../features/webhooks/webhooks-context";

@Component({
  selector: 'app-webhook-slider',
  templateUrl: './webhook-slider.component.html',
  styleUrls: ['./webhook-slider.component.css']
})
export class WebhookSliderComponent implements OnInit {
  @Input() items!: Observable<Array<WebhookApi>>

  slideConfig = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
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
  constructor(
    private readonly webhooksContext: WebhooksContext,
  ) { }

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
            dots: (it.length != 1),
            slidesToShow: 1,
            slidesToScroll: 1,
          }
         }
        ]
      }
    });
  }

  // noinspection JSUnusedLocalSymbols
  slickInit(e: any) {
    console.log('slick initialized');
  }

  // noinspection JSUnusedLocalSymbols
  breakpoint(e: any) {
    console.log('breakpoint');
  }

  // noinspection JSUnusedLocalSymbols
  afterChange(e: any) {
    console.log('afterChange');
  }

  // noinspection JSUnusedLocalSymbols
  beforeChange(e: any) {
    console.log('beforeChange');
  }

  browseWebhookApi(wg: WebhookApi) {
    this.webhooksContext.selectWebhookApi(wg);
  }
}
