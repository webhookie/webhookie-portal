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

