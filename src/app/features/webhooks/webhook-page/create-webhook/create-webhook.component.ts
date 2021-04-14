import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-create-webhook',
  templateUrl: './create-webhook.component.html',
  styleUrls: ['./create-webhook.component.css']
})
export class CreateWebhookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // $(document).ready(function () {
    //   $(".btn-warning").click(function () {
    //     $(this).toggleClass("active").parent().parent().siblings().find('after').removeClass('active')
    //   });
    // })

  }
  title(){
    return "Create new webhook group"
  }

}
