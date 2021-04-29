import {Component, OnInit} from '@angular/core';
import {VariableService} from 'src/app/features/webhooks/common/variable.service';
import * as $ from 'jquery';
import {ApplicationService} from "../../service/application.service";
import {Observable, of, ReplaySubject, Subject, zip} from "rxjs";
import {Application} from "../../model/application";
import {WebhooksContext} from "../../webhooks-context";
import {mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  appName: any;
  Desc: any;

  readonly _applications$: Subject<Array<Application>> = new ReplaySubject();

  constructor(
    private readonly applicationService: ApplicationService,
    private readonly context: WebhooksContext,
    public variable: VariableService
  ) {
  }

  get selectedApplication() {
    return this.context.currentApplication
  }

  loadApplications(): Observable<Array<Application>> {
    return this.applicationService.myApplications()
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $(".btn-warning").click(function () {
        $(this).toggleClass("active").parent().parent().siblings().find('after').removeClass('active')
      });
    })

    this.context._createdApplication$.asObservable()
      .pipe(
        mergeMap(it => zip(of(it), this.loadApplications()))
      )
      .subscribe(it => {
        this._applications$.next(it[1]);
        this.selectApp(it[0]);
      })

    this.loadApplications()
      .subscribe(list => {
        this._applications$.next(list);
        if(this.context.currentApplicationId) {
          let c = list.filter(it => it.id == this.context.currentApplicationId)[0]
          this.selectApp(c)
        }
      });
  }

  selectApp(application: Application) {
    this.context.updateApplication(application);
  }
}
