import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Entry} from "../search-list/search-list.component";
import {skip} from "rxjs/operators";

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {
  @Input() control!: FormControl
  @Input() entries!: Array<Entry>;
  @Input() id!: string;

  private readonly _selectedItems$: BehaviorSubject<Set<string>> = new BehaviorSubject(new Set<string>());

  constructor() { }

  ngOnInit(): void {
    this._selectedItems$
      .pipe(skip(1))
      .subscribe(it => {
        this.control.setValue(it);
      });
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
