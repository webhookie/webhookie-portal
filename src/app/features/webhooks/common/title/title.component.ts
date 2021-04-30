import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  // @ts-ignore
  @Input() headerTitle: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  title() {
    return this.headerTitle;
  }
}
