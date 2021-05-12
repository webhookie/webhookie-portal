import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-security-options',
  templateUrl: './security-options.component.html',
  styleUrls: ['./security-options.component.css']
})
export class SecurityOptionsComponent implements OnInit {
  securityOptions: any = [
    {
      'name': 'HMAC Signature',
      'description': 'HMAC Signature according to draft specification Signing HTTP Messages - https://tools.ietf.org/html/draft-cavage-http-signatures-05',
      type: 'Symmetric Encryption'
    },
    {
      'name': 'HMAC Signature',
      'description': 'HMAC Signature according to draft specification Signing HTTP Messages - https://tools.ietf.org/html/draft-cavage-http-signatures-05',
      type: 'Symmetric Encryption'
    },
  ];

  constructor() {
  }

  ngOnInit(): void {

  }

}

