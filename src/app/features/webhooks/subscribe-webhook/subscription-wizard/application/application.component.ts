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

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApplicationService} from "../../../service/application.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Application} from "../../../model/application";
import {ModalService} from "../../../../../shared/service/modal.service";
import {Optional} from "../../../../../shared/model/optional";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  @Output("onSelect") onSelect: EventEmitter<any> = new EventEmitter();

  readonly _applications$: BehaviorSubject<Array<Application>> = new BehaviorSubject<Array<Application>>([]);
  readonly _selectedApplication: BehaviorSubject<Optional<Application>> = new BehaviorSubject<Optional<Application>>(null)

  constructor(
    private readonly applicationService: ApplicationService,
    readonly modalService: ModalService
  ) {
  }

  get selectedApplication() {
    return this._selectedApplication.value
  }

  loadApplications(): Observable<Array<Application>> {
    return this.applicationService.myApplications()
  }

  applicationIsCreated(app: Application) {
    let list = this._applications$.value
    this._applications$.next(list.concat(...[app]))
    this.selectApp(app);
  }

  ngOnInit(): void {
    $(function() {
      $(".btn-warning").on("click", function () {
        $(this).toggleClass("active").parent().parent().siblings().find('after').removeClass('active')
      });
    });

    this.loadApplications()
      .subscribe(list => {
        this._applications$.next(list);
      });
  }

  selectApp(application: Application) {
    this._selectedApplication.next(application)
    this.onSelect.emit(application)
  }

  clearApp() {
    this._selectedApplication.next(null)
  }
}
