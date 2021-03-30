import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
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
  appSelected: any;

  readonly _applications$: Subject<Array<Application>> = new ReplaySubject();

  constructor(public modalRef: BsModalRef,
              private readonly applicationService: ApplicationService,
              private readonly log: LogService,
              private modalService: BsModalService,
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered modal-w',
      backdrop: true,
      ignoreBackdropClick: true
    });
  }

  selectApp(val: Application) {
    this.variable.appName = this.appSelected = val.name;
    this.variable.app = true;
  }

  create() {
    this.variable.appName = this.appSelected = 'Volvo cars';
    this.variable.app = true;
    this.modalRef.hide();
  }
}
