import {Component, OnInit} from '@angular/core';
import {VariableService} from '../variable.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-title',
  templateUrl: './order-title.component.html',
  styleUrls: ['./order-title.component.css']
})
export class OrderTitleComponent implements OnInit {
  orderTitle: any;

  constructor(public variable: VariableService,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

  title() {
    let crumbs = this.variable.breadCrumbs();
    return crumbs[crumbs.length - 1].displayName;
  }

  webTitle() {
    if (this.variable.selectedWebhook) {
      this.orderTitle = this.variable.selectedWebhook;
    } else {
      this.route.paramMap.subscribe(params => {
        this.variable.sideBarList.forEach((item: any) => {
          item.subList.forEach((res: any) => {
            let webhook = params.get("webhookId");
            if (res.id == webhook) {
              this.orderTitle = res;
              this.variable.selectedWebhook = res;
            }
          })
        })
      })
    }
    return this.orderTitle;
  }
}
