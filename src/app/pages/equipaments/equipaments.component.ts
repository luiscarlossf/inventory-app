import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as fromEquipament from '../../redux/equipament/equipament.reducer';
import * as EquipamentActions from '../../redux/equipament/equipament.actions';
import { Observable } from 'rxjs';
import { FiltersComponent } from '../../components/filters/filters.component';
import { EquipamentsTableComponent } from '../../components/equipaments-table/equipaments-table.component';
import { MatDialog } from '@angular/material/dialog';
import { InsertDialogComponent } from '../../components/insert-dialog/insert-dialog.component';

@Component({
  selector: 'app-equipaments',
  templateUrl: './equipaments.component.html',
  styleUrls: ['./equipaments.component.css']
})
export class EquipamentsComponent implements OnInit {
  equipaments$: Observable<fromEquipament.EquipamentState>;
  
  @ViewChild(FiltersComponent, {static: true}) 
  private filtersComponent: FiltersComponent;

  @ViewChild(EquipamentsTableComponent, {static: true})
  private equipamentTable: EquipamentsTableComponent;

  constructor(private readonly store: Store<AppState>, public dialog: MatDialog) { 
    this.equipaments$ = this.store.pipe(select('equipaments'));
  }

  openInsertDialog(){
    const dialogRef = this.dialog.open(InsertDialogComponent);

    dialogRef.afterClosed().subscribe(result=>{
      console.log('Dialog result: ${result}');
    })
  }

  filtrar(filtros: any){

  }

  ngOnInit(): void {
  }

}
