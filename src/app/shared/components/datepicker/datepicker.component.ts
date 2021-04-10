import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  bsValue = new Date();
  isOpen:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
