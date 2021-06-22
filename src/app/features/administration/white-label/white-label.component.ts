import {Component, HostBinding, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-white-label',
  templateUrl: './white-label.component.html',
  styleUrls: ['./white-label.component.css']
})


export class WhiteLabelComponent implements OnInit {
  @HostBinding("style.--primary-color") selectedColor!: string;
  constructor() {
  }

  ngOnInit(): void {
    $(document).click(function(){
      $(" ").hide();
    });

    $(".dropdown-menu").click(function(e){
      e.stopPropagation();
    });

    console.warn(this.selectedColor)


  }

}
