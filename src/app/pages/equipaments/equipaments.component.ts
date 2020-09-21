import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as fromEquipament from '../../redux/equipament/equipament.reducer';
import * as EquipamentActions from '../../redux/equipament/equipament.actions';
import { Observable, of, pipe } from 'rxjs';
import { FiltersComponent } from '../../components/filters/filters.component';
import { EquipamentsTableComponent } from '../../components/equipaments-table/equipaments-table.component';
import { MatDialog } from '@angular/material/dialog';
import { InsertDialogComponent } from '../../components/insert-dialog/insert-dialog.component';
import { Equipament } from 'src/app/models/equipament.model';
import { EditDialogComponent } from 'src/app/components/edit-dialog/edit-dialog.component';
import { filter, map, switchMap, take } from 'rxjs/operators';
@Component({
  selector: 'app-equipaments',
  templateUrl: './equipaments.component.html',
  styleUrls: ['./equipaments.component.css']
})
export class EquipamentsComponent implements OnInit {
  equipamentsState$: Observable<fromEquipament.EquipamentState>;

  equipaments$: Observable<Equipament[]>;
  
  @ViewChild(FiltersComponent, {static: true}) 
  private filtersComponent: FiltersComponent;

  @ViewChild(EquipamentsTableComponent, {static: true})
  private equipamentTable: EquipamentsTableComponent;

  constructor(private readonly store: Store<AppState>, public dialog: MatDialog) { 
    this.equipamentsState$ = this.store.pipe(select('equipaments'));
    this.equipaments$ = this.store.pipe(select(fromEquipament.selectEquipaments));
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

  ngOnInit(): void {
  }

}
