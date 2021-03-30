import { Component, OnInit } from '@angular/core';
import {CallbackValidationRequest} from "../../service/callback.service";
@Component({
  selector: 'app-callback-url',
  templateUrl: './callback-url.component.html',
  styleUrls: ['./callback-url.component.css']
})
export class CallbackUrlComponent implements OnInit {
  securityArr: any = ['HMAC Signature','API key','None'];
  security: any = "None"

  request: CallbackValidationRequest = {
    httpMethod: "POST",
    url: "http://192.168.1.101:9001/wh/product",
    payload: "{\"name\": \"Me new Endpoint - 5\",\n\"path\": \"/foo-5\"\n}",
    headers: {
      "Content-Type": ["application/json"],
      "Accept": ["*/*"]
    }
  }
  methods: Array<string> = [
    "POST", "PUT", "PATCH"
  ];

  constructor() { }

  ngOnInit(): void {

  }

  setMethod(method: string) {
    this.request.httpMethod = method
  }
}
