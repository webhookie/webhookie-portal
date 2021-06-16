import {Component, OnInit} from '@angular/core';
import {BreadcrumbComponent} from "angular-crumbs";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  hasParent(parent: BreadcrumbComponent): boolean {
    if(parent && parent.breadcrumbs) {
      return parent.breadcrumbs.length>0
    }

    return false
  }
}
