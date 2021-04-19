import {Component, Input, OnInit} from '@angular/core';
import {TableFilter} from "../../model/table/filter/table-filter";
import {FormControl, FormGroup} from "@angular/forms";
import {TimestampTableFilter} from "../../model/table/filter/timestamp-table-filter";

@Component({
  selector: 'app-timestamp-filter',
  templateUrl: './timestamp-filter.component.html',
  styleUrls: ['./timestamp-filter.component.css']
})
export class TimestampFilterComponent implements OnInit {
  @Input() filter!: TableFilter
  @Input() formGroup!: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

  private control(name: string): FormControl {
    // @ts-ignore
    return this.formGroup.controls[name];
  };

  get fromControl(): FormControl {
    return this.control(this.timestampFilter.fromFilterName)
  }

  get toControl(): FormControl {
    return this.control(this.timestampFilter.toFilterName)
  }

  get timestampFilter(): TimestampTableFilter {
    // @ts-ignore
    return this.filter;
  }
}
