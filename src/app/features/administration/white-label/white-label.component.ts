import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-white-label',
  templateUrl: './white-label.component.html',
  styleUrls: ['./white-label.component.css']
})


export class WhiteLabelComponent implements OnInit {
  selectedColor='#0151CC';
  constructor() { }

  ngOnInit(): void {
    $(document).click(function(){
      $(" ").hide();
    });

    $(".dropdown-menu").click(function(e){
      e.stopPropagation();
    });



  }

}
