import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {skip} from "rxjs/operators";
import {DropdownEntry} from "../../model/dropdownEntry";

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {
  @Input() control?: FormControl
  @Input() entries!: Array<DropdownEntry>;
  @Input() id!: string;
  @Input() show: boolean = false;

  private readonly _selectedItems$: BehaviorSubject<Set<DropdownEntry>> = new BehaviorSubject(new Set<DropdownEntry>());
  readonly selectedItems$: Observable<Set<DropdownEntry>> = this._selectedItems$.asObservable();

  constructor() { }

  ngOnInit(): void {
    this._selectedItems$
      .pipe(skip(1))
      .subscribe(it => {
        this.control?.setValue(Array.from(it));
      });
  }

  toggleAll($event: Event) {
    if(this.allSelected) {
      this._selectedItems$.next(new Set<DropdownEntry>());
    } else {
      let items: Set<DropdownEntry> = this.selectedItems;
      this.entries
        .forEach(it => items.add(it));
      this._selectedItems$.next(items);
    }
    $event.preventDefault();
  }

  toggle(key: DropdownEntry, $event: MouseEvent){
    let items = this.selectedItems;
    if(items.has(key)) {
      items.delete(key);
    } else {
      items.add(key);
    }
    this._selectedItems$.next(items);
    $event.preventDefault();
  }

  clearSelection() {
    this._selectedItems$.next(new Set<DropdownEntry>());
  }

  initSelection(items: Array<DropdownEntry>) {
    let itemsKeySet = items.map(it => it.key);
    let selected = this.entries.filter(it => itemsKeySet.indexOf(it.key) > -1)
    this._selectedItems$.next(new Set<DropdownEntry>(selected));
  }

  checkedItem(entry: DropdownEntry){
    return this.selectedItems.has(entry);
  }

  get selectedItems(): Set<DropdownEntry> {
    return this._selectedItems$.value;
  }

  get allSelected(): boolean {
    return this.selectedItems.size == this.entries.length;
  }

  get title(): string {
    return this.selectedItems.size > 0 ? `${this.selectedItems.size} item(s) selected` : 'Select'
  }
}
