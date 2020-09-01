import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  template: `
  <input #searchBox
  type="search"
  aria-label="search"
  placeholder="Pesquise pelo patrimônio."
  (input)="doSearch()"
  (keyup)="doSearch()"
  (focus)="doFocus()"
  (click)="doSearch()">
  `,
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  private searchDebounce = 300;
  private searchSubject = new Subject<string>();

  @ViewChild('searchBox', { static: true }) searchBox: ElementRef;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSearch = this.searchSubject.pipe(distinctUntilChanged(), debounceTime(this.searchDebounce));
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onFocus = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {}

  doSearch(){}

  doFocus(){}
  
  private get query(): string { return this.searchBox.nativeElement.value;}

  private set query(value: string){ this.searchBox.nativeElement.value = value;}

}
