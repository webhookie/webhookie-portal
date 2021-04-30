import {Component, OnInit} from '@angular/core';
import {WebhooksContext} from "../../webhooks-context";
import {BreadcrumbService} from "angular-crumbs";

@Component({
  selector: 'app-order-title',
  templateUrl: './order-title.component.html',
  styleUrls: ['./order-title.component.css']
})
export class OrderTitleComponent implements OnInit {
  orderTitle: any;
  title: any;

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private readonly context: WebhooksContext,
  ) {
    this.breadcrumbService.breadcrumbChanged
      .subscribe(it => {
        let crumbs = it;
        this.title = crumbs[crumbs.length - 1].displayName;
      });
  }

  get topic() {
    return this.context.selectedTopic
  }

  ngOnInit(): void {
  }
}
