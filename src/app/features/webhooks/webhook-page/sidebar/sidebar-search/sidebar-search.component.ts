import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {fromEvent, ReplaySubject, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, map, tap} from "rxjs/operators";

@Component({
  selector: 'app-sidebar-search',
  templateUrl: './sidebar-search.component.html',
  styleUrls: ['./sidebar-search.component.css']
})
export class SidebarSearchComponent implements OnInit {
  @ViewChild("searchWebhookInput", {static: true}) searchWebhookInput!: ElementRef
  @Input() searchSubject$!: Subject<string>
  readonly searchMode$: Subject<boolean> = new ReplaySubject();

  constructor() {
  }

  ngOnInit(): void {
    fromEvent(this.searchWebhookInput.nativeElement, 'keyup')
      .pipe(
        map((it: any) => it.target.value),
        tap(it => this.searchMode$.next(it.trim() != "")),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(it => this.searchSubject$.next(it))
  }

  clearSearch() {
    this.searchWebhookInput.nativeElement.value = "";
    this.searchSubject$.next("");
    this.searchMode$.next(false);
    this.searchWebhookInput.nativeElement.focus();
  }
}
