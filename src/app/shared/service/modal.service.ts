import {Injectable, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalRef?: BsModalRef

  constructor(
    private readonly modalService: BsModalService
  ) { }

  open(template: TemplateRef<any>, extraClass: string = "x-large-modal") {
    this.modalRef = this.modalService.show(template, {
      class: `modal-dialog-centered modal-w ${extraClass}`,
      backdrop: true,
      ignoreBackdropClick: true
    });
  }

  hide() {
    this.modalRef?.hide();
  }
}
