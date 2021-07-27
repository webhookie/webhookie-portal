/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";
import {BehaviorSubject, merge, Observable, OperatorFunction, Subject} from "rxjs";
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {NgbTypeaheadSelectItemEvent} from "@ng-bootstrap/ng-bootstrap/typeahead/typeahead";

@Component({
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.css']
})

export class SearchableSelectComponent {
  @Input() debug: boolean = false;
  @Input() allowCreate: boolean = false;
  @Input() title: string = ""
  @Input() values: BehaviorSubject<Array<SelectableItem | string>> = new BehaviorSubject<Array<SelectableItem | string>>([])
  @Output("onSelect") onSelect: EventEmitter<any> = new EventEmitter();
  @Output("onClear") onClear: EventEmitter<any> = new EventEmitter();
  @Output("onCreate") onCreate: EventEmitter<any> = new EventEmitter();

  selectItem(event$: NgbTypeaheadSelectItemEvent) {
    event$.preventDefault;
    this.onSelect.emit(event$.item);
  }

  init(value: SelectableItem | string) {
    this.model = value;
    this.onSelect.emit(value);
  }

  constructor(/*config: NgbTypeaheadConfig*/) {
    // config.showHint = true;
  }

  model: any;

  @ViewChild('instance', {static: true}) instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly (SelectableItem | string)[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
      .pipe(
        map(term => {
          let value = term === ''
            ? this.values.value
            : this.values.value
              .filter(v => {
                let title = this.name(v)
                return title.toLowerCase().indexOf(term.toLowerCase()) > -1
              })

          return value.slice(0, 10)
        })
      );
  }

  name(item: any): string {
    if (typeof item == "string") {
      return item
    }
    return item.name
  }

  hasItems() {
    return this.values.value.length > 0;
  }

  create() {
    this.onCreate.emit();
  }

  clear() {
    setTimeout(() => {
      this.model = '';
      this.onClear.emit(undefined)
    }, 200);
  }

  items(arr: Array<SelectableItem | string>): Array<SelectableItem | string> {
    let item
    if (typeof arr[0] == "string") {
      item = "Select Item"
    } else {
      item = {
        name: "Select Item"
      }
    }

    return [
      item,
      ...arr,
    ]
  }
}

export interface SelectableItem {
  name: string;
}

