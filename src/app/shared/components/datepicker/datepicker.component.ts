import {Component, OnInit} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {skip} from "rxjs/operators";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  bsValue = new Date();

  private readonly _value$: Subject<Date> = new ReplaySubject();
  readonly value$: Observable<Date> = this._value$.asObservable()
    .pipe(skip(1));

  constructor() { }

  ngOnInit(): void {
  }

  onDateChange(newDate: Date) {
    this._value$.next(newDate);
  }
}
