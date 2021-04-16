import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {DateTimePickerComponent} from "../date-time-picker/date-time-picker.component";

@Component({
  selector: 'app-timestamp-filter',
  templateUrl: './timestamp-filter.component.html',
  styleUrls: ['./timestamp-filter.component.css']
})
export class TimestampFilterComponent implements OnInit {
  @Input() control!: FormControl
  @ViewChild("fromComponent") fromComponent!: DateTimePickerComponent
  @ViewChild("toComponent") toComponent!: DateTimePickerComponent

  constructor() { }

  ngOnInit(): void {
  }

}
