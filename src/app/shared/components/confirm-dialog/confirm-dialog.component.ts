import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public modalService:ModalService) { }

  ngOnInit(): void {
  }

}
