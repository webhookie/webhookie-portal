import { Component, OnInit } from '@angular/core';
import { VariableService } from '../variable.service';

@Component({
  selector: 'app-order-rate-sub-links',
  templateUrl: './order-rate-sub-links.component.html',
  styleUrls: ['./order-rate-sub-links.component.css']
})
export class OrderRateSubLinksComponent implements OnInit {

  constructor(public variable:VariableService) { }

  ngOnInit(): void {
  }
  
}
