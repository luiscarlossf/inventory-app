import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as fromEquipament from '../../redux/equipament/equipament.reducer';
import * as EquipamentActions from '../../redux/equipament/equipament.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Store, select} from '@ngrx/store';
import { Observable } from 'rxjs';
import { Equipament, Status } from 'src/app/models/equipament.model';
import { AppState } from 'src/app/app.state';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-equipaments-table',
  templateUrl: './equipaments-table.component.html',
  styleUrls: ['./equipaments-table.component.css']
})
export class EquipamentsTableComponent implements OnInit {
  dataSource : MatTableDataSource<Equipament>;
  @Input() equipaments$: Observable<Array<Equipament>>;
  columnsToDisplay = ['select', 'patrimony', 'brand', 'category', 'model', 'ua', 'floor','status', 'warranty_start','warranty_end', 'acquisition_date', 'acquisition_value'];
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Equipament>(this.allowMultiSelect, this.initialSelection);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private readonly store: Store<AppState>){
    this.dataSource = new MatTableDataSource<Equipament>();
  }

  ngOnInit() {
    this.equipaments$.subscribe( equipaments =>{
      this.dataSource.data = equipaments;
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  /**
   * Verifica se o número de elementos selecionados é o 
   * mesmo que o número de linhas.
   */
  isAllSelected(){
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Seleciona todas as linhas se todas não tivere selecionadas ou 
   * limpa a seleção
   */
  masterToggle() {
    this.isAllSelected()? 
      this.selection.clear(): 
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**O rótulo para o checkbox na linha passada */
  checkboxLabel(row?: Equipament): string{
    if(!row){
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.patrimony}`;
  }
}
