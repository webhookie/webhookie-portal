import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-scrolling-text',
  templateUrl: './scrolling-text.component.html',
  styleUrls: ['./scrolling-text.component.css'],
  animations: [
    trigger('scroll', [
      state('on', style({left: '-100px'})),
      transition('* => *', [
        style({left: '-100px'}),
        animate(10000, style({left: '100%'}))
      ])
    ])
  ],
})
export class ScrollingTextComponent implements OnInit {
  @Input() text: string = ""
  state = 0;

  scrollDone() {
    this.state++;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
