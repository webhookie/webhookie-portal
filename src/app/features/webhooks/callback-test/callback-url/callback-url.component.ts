import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-callback-url',
  templateUrl: './callback-url.component.html',
  styleUrls: ['./callback-url.component.css']
})
export class CallbackUrlComponent implements OnInit {
  public static HMAC_SECURITY = "HMAC Signature"

  securityModels: any = [CallbackUrlComponent.HMAC_SECURITY, 'None'];
  securityModel: any = "None"

  method: string = "POST"
  url: string = ""
  secret: string = ""
  keyId: string = ""

  methods: Array<string> = [
    "POST", "PUT", "PATCH"
  ];

  constructor() {
  }

  ngOnInit(): void {

  }

  setMethod(method: string) {
    this.method = method
  }

  get isHmac() {
    return this.securityModel == CallbackUrlComponent.HMAC_SECURITY
  }
}
