import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TimepickerComponent} from "../timepicker/timepicker.component";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent implements OnInit {
  @Input() title!: string;
  @Input() control!: FormControl
  @ViewChild("datepickerComponent") datepickerComponent!: DatepickerComponent
  @ViewChild("timepickerComponent") timepickerComponent!: TimepickerComponent

  constructor() { }

  ngOnInit(): void {
  }

}
