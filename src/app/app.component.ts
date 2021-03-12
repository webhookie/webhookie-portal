import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webhook';
  constructor(){

  }
  ngOnInit(){
    // $(document).ready(function () {
    //   $(".menu-toggle").click(function(e) {
    //   e.preventDefault();
    //   $(".menu-toggle").toggleClass("slide")
    //   $("#wrapper").toggleClass("toggled");
    //   $(this).find('i').toggleClass('fa-times fa-grip-lines');
    //  });
    // });
  }
}


