import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as fromEquipament from '../../redux/equipament/equipament.reducer';
import * as fromBrand from '../../redux/brand/brand.reducer';
import * as fromCategory from '../../redux/category/category.reducer';
import * as fromFloor from '../../redux/floor/floor.reducer';
import * as fromModel from '../../redux/model/model.reducer';
import * as fromUa from '../../redux/ua/ua.reducer';
import * as EquipamentActions from '../../redux/equipament/equipament.actions';
import { Observable, of, pipe } from 'rxjs';
import { FiltersComponent } from '../../components/filters/filters.component';
import { EquipamentsTableComponent } from '../../components/equipaments-table/equipaments-table.component';
import { MatDialog } from '@angular/material/dialog';
import { InsertDialogComponent } from '../../components/insert-dialog/insert-dialog.component';
import { Equipament } from 'src/app/models/equipament.model';
import { EditDialogComponent } from 'src/app/components/edit-dialog/edit-dialog.component';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Brand } from 'src/app/models/brand.model';
import { Category } from 'src/app/models/category.model';
import { Model } from 'src/app/models/model.model';
import { Floor } from 'src/app/models/floor.model';
import { Ua } from 'src/app/models/ua.model';

@Component({
  selector: 'app-equipaments',
  templateUrl: './equipaments.component.html',
  styleUrls: ['./equipaments.component.css']
})
export class EquipamentsComponent implements OnInit {
  equipamentsState$: Observable<fromEquipament.EquipamentState>;

  equipaments$: Observable<Equipament[]>;
  brand$: Observable<Map<string, Brand>>;
  category$: Observable<Map<string, Category>>;
  model$: Observable<Map<string, Model>>;
  floor$: Observable<Map<string, Floor>>;
  ua$: Observable<Map<string, Ua>>;
  brand: Map<string, Brand>;
  category: Map<string, Category>;
  model: Map<string, Model>;
  floor: Map<string, Floor>;
  ua: Map<string, Ua>;
  searching: boolean = false;

  @ViewChild(FiltersComponent, {static: true}) 
  private filtersComponent: FiltersComponent;

  @ViewChild(EquipamentsTableComponent, {static: true})
  private equipamentTable: EquipamentsTableComponent;

  constructor(private readonly store: Store<AppState>, public dialog: MatDialog, private route: ActivatedRoute) { 
    this.equipamentsState$ = this.store.pipe(select('equipaments'));
    this.equipaments$ = this.store.pipe(select(fromEquipament.selectEquipaments));
    this.brand$ = this.store.select(fromBrand.selectAllBrands);
    this.category$ = this.store.select(fromCategory.selectAllCategories);
    this.floor$ = this.store.select(fromFloor.selectAllFloors);
    this.model$ = this.store.select(fromModel.selectAllModels);
    this.ua$ = this.store.select(fromUa.selectAllUas);
  }

  openInsertDialog(){
    const dialogRef = this.dialog.open(InsertDialogComponent);

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        let equipament: Equipament = {
          patrimony: result.patrimony,
          warranty_start: result.warranty_start,
          warranty_end: result.warranty_end,
          acquisition_date: result.acquisition_date,
          acquisition_value: result.acquisition_value,
          status: result.status,
          brand: result.brand,
          category: result.category,
          model: result.model,
          ua: result.ua,
          floor: result.floor
        }
        this.store.dispatch(EquipamentActions.createEquipament(equipament));
      }

    })
  }

  alterStatus(){
    
  }

  alterServerStatus(){

  }

  applyFilters(filters: any){
    console.log('Appying filters: ', filters);
    this.equipaments$.pipe(
      map(equipaments => {
        if(filters.brands){
          console.log('Filtrando por marcas...');
          return of(equipaments.filter(equipament => filters.brands.includes(equipament.brand)));
        }else{
          return of(equipaments);
        }
      }),
    );
      
    console.log('Applied filters.');
    if(filters.categories){

    }

    
    if(filters.models){
      
    }
    
    if(filters.uas){
      
    }
    
    if(filters.floors){
      
    }
    
    if(filters.warranty_start && filters.warranty_end){
      
    }
    
    if(filters.min_date && filters.max_date){
      
    }
    
    if(filters.min_value){
      
    }

    if(filters.max_value){
      
    }

    if(filters.policies){
      
    }
    
    if(filters.status){
      
    }

    if(filters.status_wsus){
      
    }

    if(filters.status_trend){
      
    }

    if(filters.status_zenworks){
      
    }
  }

  search(s: string){
    console.log("Pesquisando por ", s);
    this.searching = true;
    this.equipamentTable.filtrar(s);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      let query = params['query'];
      console.log(query);
      if(query)
        this.search(query);
    });

    this.brand$.subscribe(b => this.brand = b);
    this.category$.subscribe(c => this.category = c);
    this.floor$.subscribe(f => this.floor = f);
    this.model$.subscribe(m => this.model = m);
    this.ua$.subscribe(u => this.ua = u);

    this.equipamentTable.dataSource.filterPredicate = (d: Equipament, filter: string) => {
      let reduced_data : string;
      if(d.patrimony)
        reduced_data += d.patrimony;
      if(d.brand)
        reduced_data += this.brand.get(d.brand).name.toLowerCase();
      if(d.category)
        reduced_data += this.category.get(d.category).name.toLowerCase();
      if(d.floor)
        reduced_data += this.floor.get(d.floor).name.toLowerCase();
      if(d.model)
        reduced_data += this.model.get(d.model).name.toLowerCase();
      if(d.ua)
        reduced_data += this.ua.get(d.ua).name.toLowerCase();
      if(d.status)
        reduced_data += d.status.toLowerCase();
      if(d.acquisition_value)
        reduced_data += d.acquisition_value.toString().toLowerCase();
      if(d.acquisition_date)
        reduced_data += d.acquisition_date.toString().toLowerCase();
      if(d.warranty_start)
        reduced_data += d.warranty_start.toString().toLowerCase();
      if(d.warranty_end)
        reduced_data += d.warranty_end.toString().toLowerCase();

      return reduced_data.includes(filter);
    };
  }

}
