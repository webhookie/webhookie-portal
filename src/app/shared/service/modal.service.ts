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

  open(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered modal-w large-modal',
      backdrop: true,
      ignoreBackdropClick: true
    });
  }

  hide() {
    this.modalRef?.hide();
  }
}
