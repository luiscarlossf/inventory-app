import { Component, Input, OnInit } from '@angular/core';
import { CardItem } from 'src/app/models/card-item.model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
  @Input() cardItem: CardItem;

  constructor() { }

  ngOnInit(): void {
  }

}
