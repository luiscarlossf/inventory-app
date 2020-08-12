import { Component, OnInit } from '@angular/core';
import { ServerCard } from 'src/app/models/servar-card.model';

@Component({
  selector: 'app-server-cards',
  templateUrl: './server-cards.component.html',
  styleUrls: ['./server-cards.component.css']
})
export class ServerCardsComponent implements OnInit {

  serverCards: ServerCard[];

  constructor() { 
    this.serverCards = [
      {icon: 'home', amount:1930 ,server_name:'ZENWORKS', url: '#'},
      {icon: 'home', amount:155 ,server_name:'WSUS', url: '#'},
      {icon: 'home', amount:290 ,server_name:'TREND', url: '#'},
    ];
  }

  ngOnInit(): void {
  }

}
