import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Category } from 'src/app/models/category.model';
import { Computer } from 'src/app/models/computer.model';
import { Equipament } from 'src/app/models/equipament.model';
import { Ua } from 'src/app/models/ua.model';
import * as fromEquipament from '../../redux/equipament/equipament.reducer';
import * as fromBrand from '../../redux/brand/brand.reducer';
import * as fromCategory from '../../redux/category/category.reducer';
import * as fromFloor from '../../redux/floor/floor.reducer';
import * as fromModel from '../../redux/model/model.reducer';
import * as fromUa from '../../redux/ua/ua.reducer';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  
  private categories: Map<string, Category>;
  private uas: Map<string, Ua>;
  private equipaments: Map<string, Equipament>;
  private computers: Map<string, Computer>;

  constructor(private readonly store: Store<AppState>) { 
    this.store.select(fromEquipament.selectAllEquipaments)
      .subscribe(e => this.equipaments = e);
    
    var uas$ = this.store.select(fromUa.selectAllUas);
    uas$.subscribe(u => this.uas = u);
  }

  getAllEquipaments() : Map<string, Equipament>{
    return this.equipaments;
  }

  getUa(key: string) : Ua{
    return this.uas.get(key);
  }
}
