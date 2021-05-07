import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../shared/service/modal.service";
@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  // @ts-ignore
  @Input() headerTitle: string;

  constructor(public modalService:ModalService) {
  }

  ngOnInit(): void {
  }

  title() {
    return this.headerTitle;
  }
}
