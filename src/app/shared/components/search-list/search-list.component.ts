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

import {Component, Input, OnInit} from '@angular/core';
import {SearchListTableFilter} from "../../model/table/filter/search-list-table-filter";
import {TableFilter} from "../../model/table/filter/table-filter";
import {FormControl} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {skip} from "rxjs/operators";
import {DropdownEntry} from "../../model/dropdownEntry";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  @Input("filter") filter!: TableFilter
  @Input() control!: FormControl

  private readonly _selectedItems$: BehaviorSubject<Set<string>> = new BehaviorSubject(new Set<string>());
  entries!: Array<DropdownEntry>;

  constructor() { }

  ngOnInit(): void {
    this.init();

    this._selectedItems$
      .pipe(skip(1))
      .subscribe(it => {
        this.control.setValue(it);
      });
  }

  init(): any {
    let set: any = {};
    if(this.filter instanceof SearchListTableFilter) {
      set = this.filter.list;
    }

    this.entries = Object.keys(set).map(it => new DropdownEntry(it, set[it]))
  }

  toggleAll($event: Event) {
    if(this.allSelected) {
      this._selectedItems$.next(new Set<string>());
    } else {
      let items: Set<string> = this.selectedItems;
      this.entries
        .forEach(it => items.add(it.key));
      this._selectedItems$.next(items);
    }
    $event.preventDefault();
  }

  toggle(key: string, $event: MouseEvent){
    let items = this.selectedItems;
    if(items.has(key)) {
      items.delete(key);
    } else {
      items.add(key);
    }
    this._selectedItems$.next(items);
    $event.preventDefault();
  }

  checkedItem(entry: DropdownEntry){
    return this.selectedItems.has(entry.key);
  }

  get selectedItems(): Set<string> {
    return this._selectedItems$.value;
  }

  get allSelected(): boolean {
    return this.selectedItems.size == this.entries.length;
  }

  get title(): string {
    return this.selectedItems.size > 0 ? `${this.selectedItems.size} item(s) selected` : 'Select'
  }
}

