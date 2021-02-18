import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {

  constructor() {
    console.warn("HomeMainComponent");
  }

  ngOnInit(): void {
    console.warn("HomeMainComponent");
  }

}
