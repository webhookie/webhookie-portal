import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {
  headers: any = {
    'label': 'Headers',
    parent: [
      {
        'label': 'Authorization',
        'child': {
          'description': 'Authentication information provided in this header',
          'format': 'Signature keyId=“your key id”,algorithm=“rsa-sha256”, headers=“(request-target) host date digest content- length”, signature=“Base64(RSA-SHA256(signing string)',
          'example': 'Signature keyId=“keyid”,algorithm=“rsa-sha256”, headers=“(request-target) host date digest content-length”, signature=“EWFJDGH42UKHK2J4H52KJ325KH34KJ4HK23JK4HKHHJ3”’'
        }
      },
      {
        'label': 'Header 2',
        'child': {
          'description': 'Authentication information provided in this header',
          'format': 'Signature keyId=“your key id”,algorithm=“rsa-sha256”, headers=“(request-target) host date digest content- length”, signature=“Base64(RSA-SHA256(signing string)',
          'example': 'Signature keyId=“keyid”,algorithm=“rsa-sha256”, headers=“(request-target) host date digest content-length”, signature=“EWFJDGH42UKHK2J4H52KJ325KH34KJ4HK23JK4HKHHJ3”’'
        }
      },
      {
        'label': 'header 3',
        'child': {
          'description': 'Authentication information provided in this header',
          'format': 'Signature keyId=“your key id”,algorithm=“rsa-sha256”, headers=“(request-target) host date digest content- length”, signature=“Base64(RSA-SHA256(signing string)',
          'example': 'Signature keyId=“keyid”,algorithm=“rsa-sha256”, headers=“(request-target) host date digest content-length”, signature=“EWFJDGH42UKHK2J4H52KJ325KH34KJ4HK23JK4HKHHJ3”’'
        }
      },
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $("#header-accordion a").click(function () {
        $(this).toggleClass("active").parent().parent().siblings().find('a').removeClass('active')
      });
    })
  }

}
