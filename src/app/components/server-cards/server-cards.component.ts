import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { ServerCard } from 'src/app/models/servar-card.model';
import * as fromComputer from '../../redux/computer/computer.reducer';
import * as fromEquipament from '../../redux/equipament/equipament.reducer';
@Component({
  selector: 'app-server-cards',
  templateUrl: './server-cards.component.html',
  styleUrls: ['./server-cards.component.css']
})
export class ServerCardsComponent implements OnInit {
  countWSUS$: Observable<number>;
  countZENWORKS$: Observable<number>;
  countTREND$: Observable<number>;
  
  serverCards: ServerCard[];

  constructor( private readonly store: Store<AppState>) { 
    this.serverCards = [
      {icon: 'dns', color:'blue', amount:1930 ,server_name:'ZENWORKS', url: '#'},
      {icon: 'dns', color:'green',amount:155 ,server_name:'WSUS', url: '#'},
      {icon: 'dns', color: 'red', amount:290 ,server_name:'TREND', url: '#'},
    ];
  }

  ngOnInit(): void {
    this.countWSUS$ = this.store.select(fromEquipament.getCountWSUS, {local: null});
    this.countZENWORKS$ = this.store.select(fromEquipament.getCountZENWORKS, {local: null});
    this.countTREND$ = this.store.select(fromEquipament.getCountZENWORKS, {local: null});
  }

}
