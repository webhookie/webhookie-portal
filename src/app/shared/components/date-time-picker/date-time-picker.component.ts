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

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TimepickerComponent} from "../timepicker/timepicker.component";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {FormControl} from "@angular/forms";
import {combineLatest, ReplaySubject, Subject} from "rxjs";
import {DateUtils} from "../../date-utils";

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent implements OnInit {
  @Input() title!: string;
  @Input() control!: FormControl

  private readonly _dateValue$: Subject<Date> = new ReplaySubject();
  private readonly _timeValue$: Subject<Date> = new ReplaySubject();

  @ViewChild("datepickerComponent") set datepickerComponent(datepickerComponent: DatepickerComponent) {
    datepickerComponent.value$
      .subscribe(it => this._dateValue$.next(it));
  };

  @ViewChild("timepickerComponent") set timepickerComponent(timepickerComponent: TimepickerComponent) {
    timepickerComponent.value$
      .subscribe(it => this._timeValue$.next(it));
  };

  constructor() { }

  ngOnInit(): void {
    combineLatest([this._dateValue$, this._timeValue$])
      .subscribe(it => {
        let date: Date = it[0]
        let time: Date = it[1]
        this.control.setValue(DateUtils.utcString(date, time));
      });
  }
}
