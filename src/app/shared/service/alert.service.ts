import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {IndividualConfig} from "ngx-toastr/toastr/toastr-config";
import {ActiveToast} from "ngx-toastr/toastr/toastr.service";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private readonly toastrService: ToastrService
  ) { }

  error(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.toastrService.error(message, title, override);
  }
}
