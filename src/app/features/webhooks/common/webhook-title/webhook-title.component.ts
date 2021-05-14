import {Component, OnInit} from '@angular/core';
import {WebhooksContext} from "../../webhooks-context";
import {BreadcrumbService} from "angular-crumbs";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-webhook-title',
  templateUrl: './webhook-title.component.html',
  styleUrls: ['./webhook-title.component.css']
})
export class WebhookTitleComponent implements OnInit {
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

  get topic(): Observable<string> {
    return this.context.topic$
      .pipe(map(it => it.name))
  }

  ngOnInit(): void {
  }
}
