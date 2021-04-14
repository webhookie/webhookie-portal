import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sort-buttons',
  templateUrl: './sort-buttons.component.html',
  styleUrls: ['./sort-buttons.component.css']
})
export class SortButtonsComponent implements OnInit {
  @Output("onAsc") onAsc: EventEmitter<any> = new EventEmitter<any>();
  @Output("onDesc") onDesc: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
