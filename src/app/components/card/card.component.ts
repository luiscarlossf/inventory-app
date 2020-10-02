import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

export interface FilterLocal {
  index: number;
  local: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() index: number;
  @Input() title: string;
  @Input() link: string;
  @Output() filterLocal: EventEmitter<FilterLocal> = new EventEmitter<FilterLocal>();
  constructor() { }

  ngOnInit(): void {

  }

  filter(l: any){
    this.filterLocal.emit({index: this.index, local: l.value});
  }

}
