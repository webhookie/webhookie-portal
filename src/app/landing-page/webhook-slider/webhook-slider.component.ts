/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

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
