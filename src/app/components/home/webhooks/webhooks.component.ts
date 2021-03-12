import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-webhooks',
  templateUrl: './webhooks.component.html',
  styleUrls: ['./webhooks.component.css']
})
// export class WebhooksComponent implements OnInit {

//   constructor() {
//     $(document).ready(function () {
//       $(".menu-toggle").click(function(e) {
//       e.preventDefault();
//       $(".menu-toggle").toggleClass("slide")
//       $("#wrapper").toggleClass("toggled");
//       $(this).find('i').toggleClass('fa-times fa-grip-lines');
//      });
//     });
//    }
//   ngOnInit(): void {
   
//   }

// }
export class WebhooksComponent implements OnInit {
  constructor() {
    $(document).ready(function () {
      $(".menu-toggle").click(function(e) {
      e.preventDefault();
      $(".menu-toggle").toggleClass("slide")
      $("#wrapper").toggleClass("toggled");
      $(this).find('i').toggleClass('fa-times fa-grip-lines');
     });
     $(".menu-toggle-mobile").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
      $(this).find('i').toggleClass('fa-grip-lines fa-times');
     });
    });
   }
  ngOnInit(): void {
   
  }
}
