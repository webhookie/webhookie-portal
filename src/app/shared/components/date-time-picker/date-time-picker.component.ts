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
