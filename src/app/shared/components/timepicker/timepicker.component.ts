import { Component, OnInit } from '@angular/core';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {enGbLocale} from 'ngx-bootstrap/locale';
@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css']
})
export class TimepickerComponent implements OnInit {
  time: Date=new Date();
  constructor(private localeService: BsLocaleService) {
    enGbLocale.weekdaysShort = ["S", "M", "T", "W", "T", "F", "S"];
    defineLocale("en-gb", enGbLocale); 
  }

  ngOnInit(): void {
    this.localeService.use('en');
  }

}
