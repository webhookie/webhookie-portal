import { Component, OnInit } from '@angular/core';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {enGbLocale} from 'ngx-bootstrap/locale';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {skip} from "rxjs/operators";
@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css']
})
export class TimepickerComponent implements OnInit {
  time: Date = new Date();

  private readonly _value$: Subject<Date> = new ReplaySubject();
  readonly value$: Observable<Date> = this._value$.asObservable()
    .pipe(skip(1));

  constructor(private localeService: BsLocaleService) {
    enGbLocale.weekdaysShort = ["S", "M", "T", "W", "T", "F", "S"];
    defineLocale("en-gb", enGbLocale);
  }

  ngOnInit(): void {
    this.localeService.use('en');
  }

  changed(time: Date) {
    this._value$.next(time);
  }
}
