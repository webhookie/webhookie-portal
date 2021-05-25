import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {ApplicationService} from "../../service/application.service";
import {Observable, of, zip} from "rxjs";
import {Application} from "../../model/application";
import {mergeMap} from "rxjs/operators";
import {ModalService} from "../../../../shared/service/modal.service";
import {SubscriptionContext} from "../subscription-context";
import {SearchableSelectComponent} from "../../../../shared/components/searchable-select/searchable-select.component";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  @ViewChild("applicationsComponent", { static: true}) applicationsComponent!: SearchableSelectComponent

  constructor(
    private readonly applicationService: ApplicationService,
    private readonly context: SubscriptionContext,
    readonly modalService: ModalService
  ) {
  }

  get selectedApplication() {
    return this.context.currentApplication
  }

  loadApplications(): Observable<Array<Application>> {
    return this.applicationService.myApplications()
  }

  ngOnInit(): void {
    $(function() {
      $(".btn-warning").on("click", function () {
        $(this).toggleClass("active").parent().parent().siblings().find('after').removeClass('active')
      });
    });

    this.context._createdApplication$.asObservable()
      .pipe(
        mergeMap(it => zip(of(it), this.loadApplications()))
      )
      .subscribe(it => {
        this.applicationsComponent.values.next(it[1])
        this.selectApp(it[0]);
      })

    this.loadApplications()
      .subscribe(list => {
        this.applicationsComponent.values.next(list)
        if(this.context.currentApplicationId) {
          let c = list.filter(it => it.id == this.context.currentApplicationId)[0]
          this.selectApp(c)
        }
      });
  }

  selectApp(application?: Application) {
    this.context.updateApplication(application);
  }

  clearApp() {
    this.selectApp(undefined)
  }
}
