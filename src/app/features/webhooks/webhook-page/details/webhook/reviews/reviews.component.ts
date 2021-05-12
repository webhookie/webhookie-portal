import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../../../../../shared/service/modal.service";
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  constructor(public modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  hide() {
    this.modalService.hide();
  }
}
