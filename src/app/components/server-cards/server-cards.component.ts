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
      {icon: 'dns', color:'#0054FE', amount:1930 ,server_name:'ZENWORKS', url: '#'},
      {icon: 'dns', color:'#6EFF4A',amount:155 ,server_name:'WSUS', url: '#'},
      {icon: 'dns', color: '#FD0C0C', amount:290 ,server_name:'TREND', url: '#'},
    ];
  }

  ngOnInit(): void {
  }

}
