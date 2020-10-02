import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import * as fromEquipament from '../../redux/equipament/equipament.reducer';
import { FilterLocal } from 'src/app/components/card/card.component';

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
    index: 0,
    title:'Equipamentos fora da política', 
    link:'',
    cardItem: {properties:undefined},
  }, 
  {
    index: 1,
    title:'Equipamentos dentro da política', 
    link:'',
    cardItem: {properties:undefined},
  },
  {
    index: 2,
    title:'Números sobre os equipamentos', 
    link:'',
    cardItem: {properties: undefined},
  }];

  constructor(private readonly store: Store<AppState>) {
    this.policyOutStatics$ = this.store.select(fromEquipament.policyStatics, {policy:false});
    this.policyInStatics$ = this.store.select(fromEquipament.policyStatics, {policy:true});
    this.generalStatics$ = this.store.select(fromEquipament.generalStatics, {local: null});
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
  
  filterByLocal(l: FilterLocal){
    if(l.index === 0){ 
    this.policyOutStatics$ = this.store.select(fromEquipament.policyStatics, {local:l.local,policy:false});
    this.policyOutStatics$.subscribe(s =>{
      this.cards[0].cardItem.properties = s;
    });
   }else if(l.index === 1){
    this.policyInStatics$ = this.store.select(fromEquipament.policyStatics, {local:l.local, policy:true});
    this.policyInStatics$.subscribe(s =>{
      this.cards[1].cardItem.properties = s;
    });
  }else if(l.index === 2){
    this.generalStatics$ = this.store.select(fromEquipament.generalStatics, {local: l.local});
    this.generalStatics$.subscribe(s =>{
      this.cards[2].cardItem.properties = s;
    });
  }
  }

}
