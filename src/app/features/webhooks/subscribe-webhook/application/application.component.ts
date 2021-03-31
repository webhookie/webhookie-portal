import {Component, OnInit, TemplateRef} from '@angular/core';
import {VariableService} from 'src/app/features/webhooks/common/variable.service';
import * as $ from 'jquery';
import {ApplicationService} from "../../service/application.service";
import {LogService} from "../../../../shared/log.service";
import {ReplaySubject, Subject} from "rxjs";
import {Application} from "../../model/application";

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
              private readonly log: LogService,
              public variable: VariableService
  ) {
    this.variable.app = false;
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $(".btn-warning").click(function () {
        $(this).toggleClass("active").parent().parent().siblings().find('after').removeClass('active')
      });
    })

    this.applicationService.myApplications()
      .subscribe(it => this._applications$.next(it));

  }

  

  selectApp(val: Application) {
    this.variable.appName = val.name;
    this.variable.app = true;
  }

  
}
