import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { CardItem } from 'src/app/models/card-item.model';
import * as fromEquipament from '../../redux/equipament/equipament.reducer';
import * as fromComputer from '../../redux/computer/computer.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  policyOutStatics$: Observable<any>;
  policyInStatics$: Observable<any>;
  generalStatics$: Observable<any>;
  cards: any[] = [{
    title:'Equipamentos fora da política', 
    link:'',
    cardItem: {properties:undefined},
  }, 
  {
    title:'Equipamentos dentro da política', 
    link:'',
    cardItem: {properties:undefined},
  },
  {
    title:'Números sobre os equipamentos', 
    link:'',
    cardItem: {properties: undefined},
  }];

  constructor(private readonly store: Store<AppState>) {
    this.policyOutStatics$ = this.store.pipe(select(fromComputer.policyStatics, {policy:false}));
    this.policyInStatics$ = this.store.pipe(select(fromComputer.policyStatics, {policy:true}));
    this.generalStatics$ = this.store.pipe(select(fromComputer.generalStatics));
  }

  ngOnInit(): void {
    this.policyOutStatics$.subscribe(s =>{
      this.cards[0].cardItem.properties = s;
    });
    this.policyInStatics$.subscribe(s =>{
      this.cards[1].cardItem.properties = s;
    });
    this.generalStatics$.subscribe(s =>{
      this.cards[2].cardItem.properties = s;
    });
  }

}
