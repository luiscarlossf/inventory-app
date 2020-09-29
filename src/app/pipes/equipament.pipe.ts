import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Equipament } from '../models/equipament.model';
import * as fromEquipament from '../redux/equipament/equipament.reducer';

@Pipe({
  name: 'equipament'
})
export class EquipamentPipe implements PipeTransform {

  constructor(private readonly store: Store<AppState>){}

  transform(value: Equipament | string): string {
    let name: string = '';
    let equipaments$ = this.store.select(fromEquipament.selectEquipamentByKey, {key:value});
    if(value){
      if(typeof(value)=="string"){
        equipaments$.subscribe(equipament =>{
          name = equipament? (equipament as Equipament).patrimony : '';
        });
      }else{
        name = (value as Equipament).patrimony;
      }
      }
    return name;
  }

}
