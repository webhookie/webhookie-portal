import {Component, Input, OnInit} from '@angular/core';
import {SearchListTableFilter} from "../../model/table/filter/search-list-table-filter";
import {TableFilter} from "../../model/table/filter/table-filter";
import {FormControl} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {skip} from "rxjs/operators";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  @Input("filter") filter!: TableFilter
  @Input() control!: FormControl

  private readonly _selectedItems$: BehaviorSubject<Set<string>> = new BehaviorSubject(new Set<string>());
  entries!: Array<Entry>;

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

    this.entries = Object.keys(set).map(it => new Entry(it, set[it]))
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

  checkedItem(entry: Entry){
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

export class Entry {
  constructor(
    public key: string,
    public value: any
  ) {
  }
}
