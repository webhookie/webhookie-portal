import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {



  constructor() {
    $(document).ready(function(){
      $(".administration-menu-toggle").click(function(){
        $("#sidebar-wrapper").toggleClass("active");
      });
    })
   }

  ngOnInit(): void {
  }
  title(){
    return `Administration`
  }
}
