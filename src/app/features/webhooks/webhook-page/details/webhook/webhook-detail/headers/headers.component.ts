import {Component, Input, OnInit} from '@angular/core';
import {Webhook} from "../../../../../model/webhook";
import * as $ from "jquery";

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit{
  @Input() webhook!: Webhook

  ngOnInit(): void {
    $(function() {
      $(".collapsed").on("click", function () {
        $(this)
          .toggleClass('active')
          .parent().parent().siblings().find('a')
          .removeClass('active')
      });
    });
  }
}
