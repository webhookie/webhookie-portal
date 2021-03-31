import { Component, OnInit } from '@angular/core';
import {VariableService} from 'src/app/features/webhooks/common/variable.service';
@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {

  constructor(public variable: VariableService) { }

  ngOnInit(): void {
  }

  create() {
    this.variable.modalRef.hide();
  }
}
