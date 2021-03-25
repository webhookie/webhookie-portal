import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-callback-url',
  templateUrl: './callback-url.component.html',
  styleUrls: ['./callback-url.component.css']
})
export class CallbackUrlComponent implements OnInit {
  securityArr:any=['HMAC Signature','API key','None'];
  security:any="None"
  constructor() { }

  ngOnInit(): void {
    $(document).ready(function () {
      $(".btn-warning").click(function () { 
        $(this).toggleClass("active").parent().parent().siblings().find('after').removeClass('active')
      });
    })
  }

}
